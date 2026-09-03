from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.models.inspection import Inspection, InspectionImage, ExtractedField
from app.schemas.inspection import InspectionCreate, InspectionResponse, ExtractedFieldUpdate
from typing import List, Optional
from datetime import datetime

class InspectionService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_inspection(self, inspector_id: str, data: InspectionCreate) -> Inspection:
        inspection_number = f"INSP-{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        
        inspection = Inspection(
            inspection_number=inspection_number,
            inspector_id=str(inspector_id),
            product_name=data.product_name,
            brand_name=data.brand_name,
            commodity_type=data.commodity_type,
            product_category=data.product_category,
            product_metadata=data.product_metadata,
            inspector_notes=data.inspector_notes
        )
        self.db.add(inspection)
        await self.db.commit()
        await self.db.refresh(inspection)
        return inspection

    async def get_inspection(self, inspection_id: str) -> Optional[Inspection]:
        result = await self.db.execute(select(Inspection).where(Inspection.id == str(inspection_id)))
        return result.scalar_one_or_none()

    async def list_inspections(self, page: int = 1, size: int = 20) -> tuple[List[Inspection], int]:
        offset = (page - 1) * size
        total = await self.db.execute(select(func.count()).select_from(Inspection))
        total_count = total.scalar()
        
        result = await self.db.execute(
            select(Inspection).order_by(Inspection.created_at.desc()).offset(offset).limit(size)
        )
        inspections = result.scalars().all()
        return inspections, total_count

    async def add_image(self, inspection_id: str, image_data: dict) -> InspectionImage:
        image = InspectionImage(
            inspection_id=str(inspection_id),
            **image_data
        )
        self.db.add(image)
        await self.db.commit()
        await self.db.refresh(image)
        return image

    async def get_inspection_images(self, inspection_id: str) -> List[InspectionImage]:
        result = await self.db.execute(
            select(InspectionImage).where(InspectionImage.inspection_id == str(inspection_id))
        )
        return result.scalars().all()

    async def update_extracted_fields(self, field_id: str, data: ExtractedFieldUpdate, user_id: str) -> ExtractedField:
        result = await self.db.execute(select(ExtractedField).where(ExtractedField.id == str(field_id)))
        field = result.scalar_one_or_none()
        if field:
            field.corrected_value = data.corrected_value
            field.is_manually_corrected = True
            field.corrected_by = str(user_id)
            field.corrected_at = datetime.utcnow()
            await self.db.commit()
            await self.db.refresh(field)
        return field
