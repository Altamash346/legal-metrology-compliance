import re
from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class RegexValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Field is empty.")
            
        pattern = condition.get("pattern", "")
        if re.search(pattern, str(field_value)):
            return ValidationResult(ResultStatus.PASS, 1.0, f"Value matches pattern '{pattern}'.")
            
        return ValidationResult(ResultStatus.FAIL, 1.0, f"Value '{field_value}' does not match required pattern '{pattern}'.")
