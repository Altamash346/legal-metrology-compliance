import re
from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class QuantityFormatValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Quantity field is empty.")
            
        pattern = r"^\d+(\.\d+)?\s*(g|kg|ml|l|mg|pcs|units)$"
        if re.search(pattern, str(field_value).lower().strip()):
            return ValidationResult(ResultStatus.PASS, 0.9, "Valid quantity format.")
            
        return ValidationResult(ResultStatus.FAIL, 0.8, "Invalid quantity format. Should be number + unit (e.g., 500 g).")
