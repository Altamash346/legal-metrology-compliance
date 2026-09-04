from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.v1.router import api_router
from app.utils.logging_config import setup_logging
from app.database import engine, Base, AsyncSessionLocal
from app.models.rule import ComplianceRule, RuleType, SeverityEnum
from sqlalchemy.future import select
import logging
import json
import os

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Legal Metrology Compliance Checker API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


async def seed_demo_rules():
    """Load demo rules from rules/demo_rules.json if no rules exist in DB."""
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(ComplianceRule).limit(1))
        if result.scalar_one_or_none():
            logger.info("Rules already exist in DB, skipping seed")
            return
        
        # Try to load demo rules
        rules_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
                                   "rules", "demo_rules.json")
        
        if not os.path.exists(rules_path):
            # Fall back to essential rules
            logger.warning(f"Demo rules file not found at {rules_path}, creating essential rules")
            essential_rules = _get_essential_rules()
        else:
            with open(rules_path, 'r') as f:
                data = json.load(f)
                essential_rules = data.get("rules", data) if isinstance(data, dict) else data
        
        count = 0
        for rule_data in essential_rules:
            try:
                # Map rule_type string to enum
                rule_type_str = rule_data.get("rule_type", "REQUIRED")
                rule_type_map = {
                    "REQUIRED_FIELD": RuleType.REQUIRED,
                    "REQUIRED": RuleType.REQUIRED,
                    "REGEX": RuleType.REGEX,
                    "NUMERIC_RANGE": RuleType.NUMERIC_RANGE,
                    "DATE_FORMAT": RuleType.DATE_RELATION,
                    "DATE_RELATIONSHIP": RuleType.DATE_RELATION,
                    "DATE_RELATION": RuleType.DATE_RELATION,
                    "TEXT_PATTERN": RuleType.TEXT_PATTERN,
                    "CONDITIONAL_REQUIRED": RuleType.CONDITIONAL,
                    "CONDITIONAL": RuleType.CONDITIONAL,
                    "QUANTITY_FORMAT": RuleType.QUANTITY_FORMAT,
                    "PRICE_FORMAT": RuleType.PRICE_FORMAT,
                    "FONT_SIZE": RuleType.FONT_SIZE,
                    "CUSTOM_VALIDATOR": RuleType.CUSTOM,
                    "CUSTOM": RuleType.CUSTOM,
                }
                rule_type = rule_type_map.get(rule_type_str, RuleType.REQUIRED)
                
                severity_str = rule_data.get("severity", "MEDIUM")
                severity = SeverityEnum(severity_str)
                
                rule = ComplianceRule(
                    rule_id=rule_data["rule_id"],
                    title=rule_data["title"],
                    category=rule_data.get("category", "General"),
                    subcategory=rule_data.get("subcategory"),
                    field_name=rule_data["field_name"],
                    rule_type=rule_type,
                    condition=rule_data.get("condition", {"required": True}),
                    severity=severity,
                    legal_reference=rule_data.get("legal_reference"),
                    violation_message=rule_data.get("violation_message", "Violation detected"),
                    recommendation=rule_data.get("recommendation"),
                    applicability=rule_data.get("applicability"),
                    is_active=rule_data.get("is_active", True),
                    display_order=rule_data.get("display_order", count),
                )
                db.add(rule)
                count += 1
            except Exception as e:
                logger.error(f"Failed to seed rule {rule_data.get('rule_id', '?')}: {e}")
        
        await db.commit()
        logger.info(f"Seeded {count} demo compliance rules")


def _get_essential_rules():
    """Fallback essential rules if demo_rules.json not found."""
    return [
        {"rule_id": "LMPC-001", "title": "Manufacturer Name Required", "category": "Mandatory Declaration",
         "field_name": "manufacturer_name", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "CRITICAL", "legal_reference": "Rule 6(1)(a)", 
         "violation_message": "Manufacturer/packer name is missing",
         "recommendation": "Add manufacturer or packer name on the label"},
        {"rule_id": "LMPC-002", "title": "Net Quantity Required", "category": "Mandatory Declaration",
         "field_name": "net_quantity", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "CRITICAL", "legal_reference": "Rule 6(1)(b)",
         "violation_message": "Net quantity declaration is missing",
         "recommendation": "Declare net quantity in standard units"},
        {"rule_id": "LMPC-003", "title": "MRP Required", "category": "Mandatory Declaration",
         "field_name": "mrp", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "CRITICAL", "legal_reference": "Rule 6(1)(c)",
         "violation_message": "Maximum Retail Price (MRP) is missing",
         "recommendation": "Print MRP inclusive of all taxes"},
        {"rule_id": "LMPC-004", "title": "Manufacturing Date Required", "category": "Mandatory Declaration",
         "field_name": "manufacturing_date", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "HIGH", "legal_reference": "Rule 6(1)(d)",
         "violation_message": "Manufacturing/packing date is missing",
         "recommendation": "Include manufacturing or packing date"},
        {"rule_id": "LMPC-005", "title": "Best Before / Expiry Required", "category": "Mandatory Declaration",
         "field_name": "expiry_date", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "HIGH", "legal_reference": "Rule 6(1)(e)",
         "violation_message": "Best before / expiry date is missing",
         "recommendation": "Include best before or use by date"},
        {"rule_id": "LMPC-006", "title": "Consumer Care Info Required", "category": "Mandatory Declaration",
         "field_name": "consumer_care_number", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "MEDIUM", "legal_reference": "Rule 6(1)(f)",
         "violation_message": "Consumer care / complaint contact is missing",
         "recommendation": "Include consumer care phone number or email"},
        {"rule_id": "LMPC-007", "title": "Common/Generic Name Required", "category": "Mandatory Declaration",
         "field_name": "generic_name", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "MEDIUM", "legal_reference": "Rule 6(1)(g)",
         "violation_message": "Common or generic name is missing",
         "recommendation": "Include common or generic name of the product"},
        {"rule_id": "LMPC-008", "title": "Manufacturer Address Required", "category": "Mandatory Declaration",
         "field_name": "manufacturer_address", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "HIGH", "legal_reference": "Rule 6(1)(a)",
         "violation_message": "Manufacturer address is missing",
         "recommendation": "Include complete manufacturer/packer address"},
        {"rule_id": "LMPC-009", "title": "FSSAI License (Food)", "category": "Product Specific",
         "field_name": "fssai_number", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "CRITICAL", "legal_reference": "FSS Act 2006",
         "violation_message": "FSSAI license number is missing",
         "recommendation": "Display FSSAI license number for food products",
         "applicability": {"commodity_type": ["food"]}},
        {"rule_id": "LMPC-010", "title": "Ingredients List (Food)", "category": "Product Specific",
         "field_name": "ingredients", "rule_type": "REQUIRED_FIELD", "condition": {"required": True},
         "severity": "HIGH", "legal_reference": "FSS Regulations",
         "violation_message": "Ingredients list is missing",
         "recommendation": "List all ingredients in descending order of composition",
         "applicability": {"commodity_type": ["food"]}},
    ]


@app.on_event("startup")
async def startup_event():
    logger.info("Starting up API...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Seed demo rules
    await seed_demo_rules()


@app.get("/health")
def health_check():
    return {"status": "ok"}
