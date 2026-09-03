from typing import Dict, Any, Optional
from app.rules.validators.base import BaseValidator, ValidationResult
from app.models.compliance import ResultStatus

class ConditionalValidator(BaseValidator):
    def validate(self, field_value: Optional[str], condition: Dict[str, Any], context: Dict[str, Any] = None) -> ValidationResult:
        target_field = condition.get("target_field")
        target_value = condition.get("target_value")
        
        if context and context.get(target_field) == target_value:
            if not field_value:
                return ValidationResult(ResultStatus.FAIL, 1.0, f"Field required because {target_field} is {target_value}.")
            return ValidationResult(ResultStatus.PASS, 1.0, "Conditional requirement met.")
            
        return ValidationResult(ResultStatus.NOT_APPLICABLE, 1.0, "Condition not met.")
