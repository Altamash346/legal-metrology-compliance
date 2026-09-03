from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus
from dateutil import parser

class DateValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        if not field_value:
            return ValidationResult(ResultStatus.FAIL, 1.0, "Date field is empty.")
            
        try:
            parsed_date = parser.parse(str(field_value), fuzzy=True)
            return ValidationResult(ResultStatus.PASS, 1.0, f"Valid date: {parsed_date.strftime('%Y-%m-%d')}.")
        except Exception as e:
            return ValidationResult(ResultStatus.FAIL, 0.8, f"Invalid date format: {field_value}")
