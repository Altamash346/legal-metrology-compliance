import re
from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class PriceFormatValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Price field is empty.")
            
        val_lower = str(field_value).lower()
        has_currency = "rs" in val_lower or "₹" in val_lower
        has_taxes_clause = "inclusive of all taxes" in val_lower or "incl. of all taxes" in val_lower
        
        if has_currency and has_taxes_clause and re.search(r"\d+(\.\d+)?", val_lower):
            return ValidationResult(ResultStatus.PASS, 0.9, "Valid price format.")
            
        return ValidationResult(ResultStatus.FAIL, 0.7, "Invalid price format. Missing currency symbol or 'inclusive of all taxes' clause.")
