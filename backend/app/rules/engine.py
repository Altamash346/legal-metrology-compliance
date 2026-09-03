from typing import List, Dict, Any
from app.models.rule import ComplianceRule
from app.models.compliance import ComplianceResult, ResultStatus
from app.rules.validators import ValidatorRegistry
from app.rules.applicability import ApplicabilityFilter
import uuid

class RuleEngine:
    def __init__(self, rules: List[ComplianceRule]):
        self.rules = rules

    def evaluate(self, inspection_id: uuid.UUID, product_metadata: Dict[str, Any], extracted_fields: List[Dict[str, Any]]) -> List[ComplianceResult]:
        applicable_rules = ApplicabilityFilter.filter_rules(self.rules, product_metadata)
        results = []
        
        # Convert extracted fields list to dict for easier lookup
        fields_dict = {f["field_name"]: f.get("corrected_value") or f.get("normalized_value") or f.get("raw_value") for f in extracted_fields}
        
        for rule in applicable_rules:
            validator = ValidatorRegistry.get(rule.rule_type)
            if not validator:
                continue
                
            field_value = fields_dict.get(rule.field_name)
            validation_result = validator.validate(field_value, rule.condition, fields_dict)
            
            # Apply confidence thresholds
            status = validation_result.status
            if status == ResultStatus.PASS and validation_result.confidence < 0.70:
                status = ResultStatus.REVIEW
            
            results.append(ComplianceResult(
                inspection_id=inspection_id,
                rule_id=rule.id,
                field_name=rule.field_name,
                detected_value=str(field_value) if field_value is not None else None,
                expected_condition=str(rule.condition),
                status=status,
                severity=rule.severity.value,
                confidence=validation_result.confidence,
                legal_reference=rule.legal_reference,
                explanation=validation_result.explanation or rule.violation_message,
                recommendation=rule.recommendation,
                evidence=validation_result.evidence
            ))
            
        return results
