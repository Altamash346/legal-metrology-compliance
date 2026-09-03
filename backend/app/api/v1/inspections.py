from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.inspection import InspectionCreate, InspectionResponse, InspectionListResponse, ExtractedFieldUpdate
from app.services.inspection_service import InspectionService
from app.services.image_service import ImageService
from app.services.report_service import ReportService
from app.api.deps import get_current_user
from app.models.user import User
from app.utils.storage import storage
from fastapi.responses import FileResponse

router = APIRouter()

@router.post("/", response_model=InspectionResponse)
async def create_inspection(
    data: InspectionCreate, 
    db: AsyncSession = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    service = InspectionService(db)
    insp = await service.create_inspection(current_user.id, data)
    return InspectionResponse.model_validate(insp)

@router.get("/", response_model=InspectionListResponse)
async def list_inspections(
    page: int = 1,
    size: int = 20,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = InspectionService(db)
    inspections, total = await service.list_inspections(page, size)
    return InspectionListResponse(
        items=[InspectionResponse.model_validate(i) for i in inspections],
        total=total,
        page=page,
        size=size
    )

@router.get("/{inspection_id}", response_model=InspectionResponse)
async def get_inspection(
    inspection_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = InspectionService(db)
    ins = await service.get_inspection(inspection_id)
    if not ins:
        raise HTTPException(status_code=404, detail="Inspection not found")
    return InspectionResponse.model_validate(ins)

@router.post("/{inspection_id}/images")
async def upload_image(
    inspection_id: str,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    path = await storage.save_file(file, 'uploads')
    
    img_data = {
        "original_path": path,
        "file_type": file.content_type,
        "file_size": 0,
        "label_side": "front"
    }
    service = InspectionService(db)
    img = await service.add_image(inspection_id, img_data)
    
    img_service = ImageService(db)
    await img_service.process_uploaded_image(inspection_id, img.id, path)
    return {"message": "Uploaded and processing started", "image_id": img.id}

@router.patch("/fields/{field_id}")
async def update_extracted_field(
    field_id: str,
    data: ExtractedFieldUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    service = InspectionService(db)
    field = await service.update_extracted_fields(field_id, data, current_user.id)
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    return {"message": "Field updated", "field_id": str(field.id)}
