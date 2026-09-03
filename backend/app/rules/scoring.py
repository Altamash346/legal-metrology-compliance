from typing import List
from app.models.compliance import ComplianceResult, ResultStatus
from app.models.inspection import ComplianceStatus
from app.models.rule import SeverityEnum

class ScoreCalculator:
    WEIGHTS = {
        SeverityEnum.CRITICAL.value: 10,
        SeverityEnum.HIGH.value: 7,
        SeverityEnum.MEDIUM.value: 4,
        SeverityEnum.LOW.value: 2
    }
    
    STATUS_MULTIPLIERS = {
        ResultStatus.PASS.value: 1.0,
        ResultStatus.REVIEW.value: 0.5,
        ResultStatus.FAIL.value: 0.0
    }

    @classmethod
    def calculate(cls, results: List[ComplianceResult]) -> tuple[float, ComplianceStatus]:
        total_weight = 0.0
        earned_score = 0.0
        has_critical_fail = False
        requires_review = False
        
        for r in results:
            if r.status.value == ResultStatus.NOT_APPLICABLE.value:
                continue
                
            weight = cls.WEIGHTS.get(r.severity, 2)
            multiplier = cls.STATUS_MULTIPLIERS.get(r.status.value, 0.0)
            
            total_weight += weight
            earned_score += (weight * multiplier)
            
            if r.status.value == ResultStatus.FAIL.value and r.severity == SeverityEnum.CRITICAL.value:
                has_critical_fail = True
            if r.status.value == ResultStatus.REVIEW.value:
                requires_review = True
                
        score = (earned_score / total_weight * 100) if total_weight > 0 else 100.0
        
        status = ComplianceStatus.COMPLIANT
        if has_critical_fail or score < 70.0:
            status = ComplianceStatus.NON_COMPLIANT
        elif requires_review:
            status = ComplianceStatus.REQUIRES_REVIEW
            
        return round(score, 2), status
