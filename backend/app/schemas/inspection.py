from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.inspection import ComplianceStatus

class InspectionCreate(BaseModel):
    product_name: Optional[str] = None
    brand_name: Optional[str] = None
    commodity_type: Optional[str] = None
    product_category: Optional[str] = None
    product_metadata: Optional[Dict[str, Any]] = None
    inspector_notes: Optional[str] = None

class InspectionResponse(BaseModel):
    id: str
    inspection_number: str
    inspector_id: str
    product_name: Optional[str] = None
    brand_name: Optional[str] = None
    commodity_type: Optional[str] = None
    product_category: Optional[str] = None
    compliance_score: Optional[float] = None
    compliance_status: Optional[ComplianceStatus] = None
    resolution_status: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class InspectionListResponse(BaseModel):
    items: List[InspectionResponse]
    total: int
    page: int
    size: int

class ImageUploadResponse(BaseModel):
    id: str
    inspection_id: str
    original_path: str
    file_type: Optional[str] = None
    file_size: Optional[int] = None

class OcrResultResponse(BaseModel):
    id: str
    full_text: Optional[str] = None
    overall_confidence: Optional[float] = None
    text_regions: Optional[Dict[str, Any]] = None

    model_config = {"from_attributes": True}

class ExtractedFieldResponse(BaseModel):
    id: str
    field_name: str
    raw_value: Optional[str] = None
    normalized_value: Optional[str] = None
    corrected_value: Optional[str] = None
    confidence: Optional[float] = None
    bounding_box: Optional[Dict[str, Any]] = None

    model_config = {"from_attributes": True}

class ExtractedFieldUpdate(BaseModel):
    corrected_value: str

class ProcessingStatusResponse(BaseModel):
    inspection_id: str
    status: str
    message: str
    extracted_fields: List[ExtractedFieldResponse] = []
