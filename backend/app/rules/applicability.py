from typing import List, Dict, Any
from app.models.rule import ComplianceRule

class ApplicabilityFilter:
    @staticmethod
    def filter_rules(rules: List[ComplianceRule], product_metadata: Dict[str, Any]) -> List[ComplianceRule]:
        if not product_metadata:
            return rules
            
        applicable = []
        for rule in rules:
            if not rule.applicability:
                applicable.append(rule)
                continue
                
            is_applicable = True
            for key, expected_value in rule.applicability.items():
                if key in product_metadata:
                    actual_value = product_metadata[key]
                    if isinstance(expected_value, list):
                        if actual_value not in expected_value:
                            is_applicable = False
                            break
                    elif actual_value != expected_value:
                        is_applicable = False
                        break
            
            if is_applicable:
                applicable.append(rule)
                
        return applicable
