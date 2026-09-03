from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from app.models.compliance import ResultStatus
from app.models.inspection import ComplianceStatus

class ComplianceResultResponse(BaseModel):
    id: str
    rule_id: str
    field_name: str
    detected_value: Optional[str] = None
    expected_condition: Optional[str] = None
    status: ResultStatus
    severity: Optional[str] = None
    confidence: Optional[float] = None
    legal_reference: Optional[str] = None
    explanation: Optional[str] = None
    recommendation: Optional[str] = None
    evidence: Optional[Dict[str, Any]] = None

    model_config = {"from_attributes": True}

class ComplianceReportResponse(BaseModel):
    score: float
    status: ComplianceStatus
    total_checks: int
    passed: int
    failed: int
    review: int
    results: List[ComplianceResultResponse]
