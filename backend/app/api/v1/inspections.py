from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.schemas.inspection import (
    InspectionCreate, InspectionResponse, InspectionListResponse, 
    ExtractedFieldUpdate, ExtractedFieldResponse, OcrResultResponse
)
from app.schemas.compliance import ComplianceResultResponse, ComplianceReportResponse
from app.services.inspection_service import InspectionService
from app.services.image_service import ImageService
from app.api.deps import get_current_user
from app.models.user import User
from app.models.inspection import Inspection, ExtractedField, OcrResult, ComplianceStatus
from app.models.compliance import ComplianceResult, ResultStatus
from app.models.rule import ComplianceRule
from app.rules.engine import RuleEngine
from app.rules.scoring import ScoreCalculator
from app.utils.storage import storage
import logging

logger = logging.getLogger(__name__)
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
    """Upload image, run OCR, extract fields, then auto-validate against rules."""
    # Save file
    path = await storage.save_file(file, 'uploads')
    
    img_data = {
        "original_path": path,
        "file_type": file.content_type,
        "file_size": 0,
        "label_side": "front"
    }
    service = InspectionService(db)
    img = await service.add_image(inspection_id, img_data)
    
    # Run OCR pipeline
    img_service = ImageService(db)
    success = await img_service.process_uploaded_image(inspection_id, img.id, path)
    
    if not success:
        return {"message": "Image uploaded but OCR processing failed. You may need to install PaddleOCR.", 
                "image_id": img.id, "ocr_success": False}
    
    # Auto-run compliance validation after OCR
    await _run_validation(inspection_id, db)
    
    return {"message": "Image processed and compliance checks completed", 
            "image_id": img.id, "ocr_success": True}


@router.post("/{inspection_id}/validate")
async def validate_inspection(
    inspection_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Run/re-run compliance rule validation on an inspection's extracted fields."""
    report = await _run_validation(inspection_id, db)
    return report


@router.get("/{inspection_id}/fields", response_model=list[ExtractedFieldResponse])
async def get_extracted_fields(
    inspection_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all extracted fields for an inspection."""
    result = await db.execute(
        select(ExtractedField).where(ExtractedField.inspection_id == inspection_id)
    )
    fields = result.scalars().all()
    return [ExtractedFieldResponse.model_validate(f) for f in fields]


@router.get("/{inspection_id}/ocr", response_model=list[OcrResultResponse])
async def get_ocr_results(
    inspection_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get OCR results for an inspection."""
    result = await db.execute(
        select(OcrResult).where(OcrResult.inspection_id == inspection_id)
    )
    ocr_results = result.scalars().all()
    return [OcrResultResponse.model_validate(r) for r in ocr_results]


@router.get("/{inspection_id}/compliance", response_model=ComplianceReportResponse)
async def get_compliance_results(
    inspection_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get compliance results (score, status, all checks) for an inspection."""
    # Get inspection
    insp_result = await db.execute(select(Inspection).where(Inspection.id == inspection_id))
    inspection = insp_result.scalar_one_or_none()
    if not inspection:
        raise HTTPException(status_code=404, detail="Inspection not found")
    
    # Get compliance results
    result = await db.execute(
        select(ComplianceResult).where(ComplianceResult.inspection_id == inspection_id)
    )
    results = result.scalars().all()
    
    passed = sum(1 for r in results if r.status == ResultStatus.PASS)
    failed = sum(1 for r in results if r.status == ResultStatus.FAIL)
    review = sum(1 for r in results if r.status == ResultStatus.REVIEW)
    
    return ComplianceReportResponse(
        score=inspection.compliance_score or 0.0,
        status=inspection.compliance_status or ComplianceStatus.REQUIRES_REVIEW,
        total_checks=len(results),
        passed=passed,
        failed=failed,
        review=review,
        results=[ComplianceResultResponse.model_validate(r) for r in results]
    )


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


async def _run_validation(inspection_id: str, db: AsyncSession) -> dict:
    """Internal: run rule engine on inspection's extracted fields and save results."""
    
    # Get inspection
    insp_result = await db.execute(select(Inspection).where(Inspection.id == inspection_id))
    inspection = insp_result.scalar_one_or_none()
    if not inspection:
        raise HTTPException(status_code=404, detail="Inspection not found")
    
    # Get all active rules
    rules_result = await db.execute(
        select(ComplianceRule).where(ComplianceRule.is_active == True)
    )
    rules = rules_result.scalars().all()
    
    if not rules:
        logger.warning("No active compliance rules found. Import rules first.")
        return {"message": "No active rules configured", "score": 0, "total_checks": 0}
    
    # Get extracted fields
    fields_result = await db.execute(
        select(ExtractedField).where(ExtractedField.inspection_id == inspection_id)
    )
    fields = fields_result.scalars().all()
    fields_list = [
        {
            "field_name": f.field_name,
            "raw_value": f.raw_value,
            "normalized_value": f.normalized_value,
            "corrected_value": f.corrected_value,
            "confidence": f.confidence
        }
        for f in fields
    ]
    
    product_metadata = inspection.product_metadata or {}
    
    # Delete previous compliance results for this inspection
    old_results = await db.execute(
        select(ComplianceResult).where(ComplianceResult.inspection_id == inspection_id)
    )
    for old in old_results.scalars().all():
        await db.delete(old)
    
    # Run rule engine
    engine = RuleEngine(rules)
    compliance_results = engine.evaluate(inspection_id, product_metadata, fields_list)
    
    # Save results
    for cr in compliance_results:
        db.add(cr)
    
    # Calculate score
    score, status = ScoreCalculator.calculate(compliance_results)
    
    # Update inspection
    inspection.compliance_score = score
    inspection.compliance_status = status
    
    await db.commit()
    
    passed = sum(1 for r in compliance_results if r.status == ResultStatus.PASS)
    failed = sum(1 for r in compliance_results if r.status == ResultStatus.FAIL)
    review = sum(1 for r in compliance_results if r.status == ResultStatus.REVIEW)
    
    logger.info(f"Validation complete for {inspection_id}: score={score}%, status={status.value}, "
               f"passed={passed}, failed={failed}, review={review}")
    
    return {
        "score": score,
        "status": status.value,
        "total_checks": len(compliance_results),
        "passed": passed,
        "failed": failed,
        "review": review,
    }
