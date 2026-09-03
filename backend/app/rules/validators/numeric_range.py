from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus
import re

class NumericRangeValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Field is empty.")
            
        # Extract numbers
        numbers = re.findall(r"[-+]?\d*\.\d+|\d+", str(field_value))
        if not numbers:
            return ValidationResult(ResultStatus.FAIL, 1.0, "No numeric value found.")
            
        val = float(numbers[0])
        min_val = condition.get("min")
        max_val = condition.get("max")
        
        if min_val is not None and val < min_val:
            return ValidationResult(ResultStatus.FAIL, 1.0, f"Value {val} is less than minimum {min_val}.")
        if max_val is not None and val > max_val:
            return ValidationResult(ResultStatus.FAIL, 1.0, f"Value {val} is greater than maximum {max_val}.")
            
        return ValidationResult(ResultStatus.PASS, 1.0, f"Value {val} is within range.")
