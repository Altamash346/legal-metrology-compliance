from sqlalchemy import Column, String, Integer, Boolean, DateTime, Enum, JSON
import uuid
from datetime import datetime
import enum
from app.database import Base

class RuleType(str, enum.Enum):
    REQUIRED = "REQUIRED"
    REGEX = "REGEX"
    NUMERIC_RANGE = "NUMERIC_RANGE"
    DATE_RELATION = "DATE_RELATION"
    TEXT_PATTERN = "TEXT_PATTERN"
    CONDITIONAL = "CONDITIONAL"
    QUANTITY_FORMAT = "QUANTITY_FORMAT"
    PRICE_FORMAT = "PRICE_FORMAT"
    FONT_SIZE = "FONT_SIZE"
    CUSTOM = "CUSTOM"

class SeverityEnum(str, enum.Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class ComplianceRule(Base):
    __tablename__ = "compliance_rules"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    rule_id = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    subcategory = Column(String, nullable=True)
    field_name = Column(String, nullable=False)
    rule_type = Column(Enum(RuleType), nullable=False)
    condition = Column(JSON, nullable=False)
    severity = Column(Enum(SeverityEnum), nullable=False)
    legal_reference = Column(String, nullable=True)
    violation_message = Column(String, nullable=False)
    recommendation = Column(String, nullable=True)
    applicability = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    version = Column(Integer, default=1)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
