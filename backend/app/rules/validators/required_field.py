from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class RequiredFieldValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if field_value is None or str(field_value).strip() == "":
            return ValidationResult(
                status=ResultStatus.FAIL,
                confidence=1.0,
                explanation="Required field is missing or empty.",
                evidence={"detected": None}
            )
        return ValidationResult(
            status=ResultStatus.PASS,
            confidence=1.0,
            explanation=f"Field is present: {field_value}",
            evidence={"detected": field_value}
        )
