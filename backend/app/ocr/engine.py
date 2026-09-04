import time
import logging
from typing import Dict, Any, Tuple, List
import cv2
import numpy as np
from PIL import Image

logger = logging.getLogger(__name__)


class OCREngine:
    def __init__(self, use_gpu: bool = False):
        self.ocr_backend = None
        
        # Try PaddleOCR first
        try:
            from paddleocr import PaddleOCR
            self.engine = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=use_gpu, show_log=False)
            self.ocr_backend = "paddleocr"
            logger.info("Using PaddleOCR engine")
        except ImportError:
            pass
        
        # Fall back to Tesseract
        if not self.ocr_backend:
            try:
                import pytesseract
                pytesseract.get_tesseract_version()
                self.ocr_backend = "tesseract"
                logger.info("Using Tesseract OCR engine")
            except Exception as e:
                logger.warning(f"Tesseract not available: {e}")
        
        if not self.ocr_backend:
            logger.error("No OCR engine available! Install Tesseract or PaddleOCR.")

    def extract_text(self, image_path: str) -> Tuple[str, float, Dict[str, Any], int]:
        """Run OCR on an image. Returns (full_text, avg_confidence, regions_dict, processing_time_ms)."""
        start_time = time.time()
        
        if self.ocr_backend == "paddleocr":
            return self._extract_paddle(image_path, start_time)
        elif self.ocr_backend == "tesseract":
            return self._extract_tesseract(image_path, start_time)
        else:
            logger.error("No OCR engine available")
            return "", 0.0, {"regions": []}, 0

    def _extract_paddle(self, image_path: str, start_time: float) -> Tuple[str, float, Dict[str, Any], int]:
        try:
            result = self.engine.ocr(image_path, cls=True)
            
            full_text: List[str] = []
            total_conf = 0.0
            count = 0
            regions: List[Dict[str, Any]] = []
            
            if result and result[0]:
                for idx, line in enumerate(result[0]):
                    if not line or len(line) < 2:
                        continue
                    bbox = line[0]
                    text_conf = line[1]
                    if isinstance(text_conf, tuple) and len(text_conf) == 2:
                        text, conf = text_conf
                    else:
                        continue
                    full_text.append(str(text))
                    total_conf += float(conf)
                    count += 1
                    regions.append({
                        "id": idx, "text": str(text),
                        "confidence": float(conf), "box": bbox
                    })
                    
            avg_conf = (total_conf / count) if count > 0 else 0.0
            processing_time = int((time.time() - start_time) * 1000)
            logger.info(f"PaddleOCR: {count} regions, avg conf: {avg_conf:.2f}, time: {processing_time}ms")
            return "\n".join(full_text), avg_conf, {"regions": regions}, processing_time
            
        except Exception as e:
            logger.error(f"PaddleOCR error: {e}", exc_info=True)
            return "", 0.0, {"regions": []}, int((time.time() - start_time) * 1000)

    def _extract_tesseract(self, image_path: str, start_time: float) -> Tuple[str, float, Dict[str, Any], int]:
        """Extract text using Tesseract OCR with word-level bounding boxes."""
        import pytesseract
        
        try:
            img = Image.open(image_path)
            
            # Get detailed data with bounding boxes
            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
            
            full_text_lines: List[str] = []
            regions: List[Dict[str, Any]] = []
            total_conf = 0.0
            count = 0
            current_line = []
            current_line_num = -1
            
            for i in range(len(data['text'])):
                text = data['text'][i].strip()
                conf = float(data['conf'][i])
                line_num = data['line_num'][i]
                
                if not text or conf < 0:
                    continue
                
                # Group by line
                if line_num != current_line_num:
                    if current_line:
                        full_text_lines.append(" ".join(current_line))
                    current_line = []
                    current_line_num = line_num
                
                current_line.append(text)
                
                x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
                box = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]
                
                conf_normalized = conf / 100.0
                total_conf += conf_normalized
                count += 1
                
                regions.append({
                    "id": count - 1,
                    "text": text,
                    "confidence": conf_normalized,
                    "box": box
                })
            
            # Don't forget last line
            if current_line:
                full_text_lines.append(" ".join(current_line))
            
            # Also get simple full text
            simple_text = pytesseract.image_to_string(img)
            combined_text = simple_text.strip() if simple_text.strip() else "\n".join(full_text_lines)
            
            avg_conf = (total_conf / count) if count > 0 else 0.0
            processing_time = int((time.time() - start_time) * 1000)
            
            logger.info(f"Tesseract OCR: {count} words, {len(full_text_lines)} lines, "
                       f"avg conf: {avg_conf:.2f}, time: {processing_time}ms")
            logger.debug(f"Extracted text:\n{combined_text[:500]}")
            
            return combined_text, avg_conf, {"regions": regions}, processing_time
            
        except Exception as e:
            logger.error(f"Tesseract error: {e}", exc_info=True)
            return "", 0.0, {"regions": []}, int((time.time() - start_time) * 1000)

    def draw_annotations(self, image_path: str, regions: Dict[str, Any], output_path: str):
        """Draw bounding boxes on the image."""
        try:
            img = cv2.imread(image_path)
            if img is None:
                return
                
            for region in regions.get("regions", []):
                box = region.get("box", [])
                if not box or len(box) < 4:
                    continue
                points = np.array([[int(p[0]), int(p[1])] for p in box], dtype=np.int32)
                cv2.polylines(img, [points], True, (0, 255, 0), 2)
                
                conf = region.get("confidence", 0)
                text_label = f"{conf:.0%}"
                cv2.putText(img, text_label, (points[0][0], points[0][1] - 5),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)
                
            import os
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            cv2.imwrite(output_path, img)
        except Exception as e:
            logger.error(f"Annotation error: {e}")
