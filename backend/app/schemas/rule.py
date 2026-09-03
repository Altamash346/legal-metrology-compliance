from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from app.models.rule import RuleType, SeverityEnum

class RuleBase(BaseModel):
    title: str
    category: str
    subcategory: Optional[str] = None
    field_name: str
    rule_type: RuleType
    condition: Dict[str, Any]
    severity: SeverityEnum
    legal_reference: Optional[str] = None
    violation_message: str
    recommendation: Optional[str] = None
    applicability: Optional[Dict[str, Any]] = None
    is_active: bool = True

class RuleCreate(RuleBase):
    rule_id: str

class RuleUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    field_name: Optional[str] = None
    rule_type: Optional[RuleType] = None
    condition: Optional[Dict[str, Any]] = None
    severity: Optional[SeverityEnum] = None
    legal_reference: Optional[str] = None
    violation_message: Optional[str] = None
    recommendation: Optional[str] = None
    applicability: Optional[Dict[str, Any]] = None
    is_active: Optional[bool] = None

class RuleResponse(RuleBase):
    id: str
    rule_id: str
    version: int = 1
    display_order: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class RuleImportRequest(BaseModel):
    rules: List[RuleCreate]

class RuleExportResponse(BaseModel):
    rules: List[RuleResponse]
    exported_at: datetime = Field(default_factory=datetime.utcnow)
