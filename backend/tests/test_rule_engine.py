import pytest
import uuid
from app.rules.engine import RuleEngine
from app.models.rule import ComplianceRule, RuleType, SeverityEnum
from app.models.compliance import ResultStatus

@pytest.fixture
def rules():
    return [
        ComplianceRule(
            id=uuid.uuid4(),
            rule_id="R001",
            title="Req Field",
            category="Gen",
            field_name="manufacturer_name",
            rule_type=RuleType.REQUIRED,
            condition={},
            severity=SeverityEnum.CRITICAL,
            violation_message="Missing",
            applicability=None
        ),
        ComplianceRule(
            id=uuid.uuid4(),
            rule_id="R002",
            title="App Field",
            category="Gen",
            field_name="fssai_number",
            rule_type=RuleType.REQUIRED,
            condition={},
            severity=SeverityEnum.CRITICAL,
            violation_message="Missing",
            applicability={"product_category": "Food"}
        )
    ]

def test_rule_engine(rules):
    engine = RuleEngine(rules)
    
    # 1. All pass
    res = engine.evaluate(uuid.uuid4(), {"product_category": "Food"}, [{"field_name": "manufacturer_name", "raw_value": "ABC Ltd"}, {"field_name": "fssai_number", "raw_value": "12345678901234"}])
    assert len(res) == 2
    assert res[0].status == ResultStatus.PASS
    assert res[1].status == ResultStatus.PASS

    # 2. Missing field
    res2 = engine.evaluate(uuid.uuid4(), {}, [])
    assert len(res2) == 1 # Second rule N/A
    assert res2[0].status == ResultStatus.FAIL

    # 3. Not applicable
    res3 = engine.evaluate(uuid.uuid4(), {"product_category": "Electronics"}, [{"field_name": "manufacturer_name", "raw_value": "ABC Ltd"}])
    assert len(res3) == 1
    assert res3[0].status == ResultStatus.PASS
