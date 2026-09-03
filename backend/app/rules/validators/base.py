from dataclasses import dataclass
from typing import Dict, Any, Optional
from app.models.compliance import ResultStatus

@dataclass
class ValidationResult:
    status: ResultStatus
    confidence: float
    explanation: str
    evidence: Optional[Dict[str, Any]] = None

class BaseValidator:
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        raise NotImplementedError("Subclasses must implement validate()")
