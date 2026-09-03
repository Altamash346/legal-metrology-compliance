import uuid
import os
from fastapi import UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from app.utils.storage import storage
from app.ocr.preprocessor import Preprocessor
from app.ocr.engine import OCREngine
from app.ocr.field_extractor import FieldExtractor
from app.models.inspection import OcrResult, ExtractedField
import logging

logger = logging.getLogger(__name__)

class ImageService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.ocr_engine = OCREngine()
        self.extractor = FieldExtractor()

    async def process_uploaded_image(self, inspection_id: uuid.UUID, image_id: uuid.UUID, image_path: str):
        try:
            # 1. Preprocess
            processed_path = storage.get_file_path(f"processed/{image_id}.png")
            processed_img = Preprocessor.process(image_path)
            Preprocessor.save_processed(processed_img, processed_path)

            # 2. OCR
            annotated_path = storage.get_file_path(f"annotated/{image_id}.png")
            full_text, conf, regions, p_time = self.ocr_engine.extract_text(processed_path)
            self.ocr_engine.draw_annotations(processed_path, regions, annotated_path)

            # Save OCR Results
            ocr_result = OcrResult(
                image_id=image_id,
                inspection_id=inspection_id,
                full_text=full_text,
                overall_confidence=conf,
                text_regions=regions,
                processing_time_ms=p_time,
                ocr_engine="paddleocr"
            )
            self.db.add(ocr_result)
            await self.db.flush()

            # 3. Field Extraction
            fields_data = self.extractor.extract_fields(full_text, regions)
            for fd in fields_data:
                field = ExtractedField(
                    inspection_id=inspection_id,
                    ocr_result_id=ocr_result.id,
                    source_image_id=image_id,
                    **fd
                )
                self.db.add(field)

            await self.db.commit()
            return True

        except Exception as e:
            logger.error(f"Failed to process image: {e}")
            await self.db.rollback()
            return False
