from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class TextPatternValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Field is empty.")
            
        required_text = condition.get("contains", "").lower()
        if required_text in str(field_value).lower():
            return ValidationResult(ResultStatus.PASS, 1.0, f"Text contains '{required_text}'.")
            
        return ValidationResult(ResultStatus.FAIL, 1.0, f"Text does not contain required phrase '{required_text}'.")
