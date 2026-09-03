from sqlalchemy import Column, String, Float, DateTime, Enum, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.database import Base

class ResultStatus(str, enum.Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    REVIEW = "REVIEW"
    NOT_APPLICABLE = "NOT_APPLICABLE"

class ComplianceResult(Base):
    __tablename__ = "compliance_results"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_id = Column(String(36), ForeignKey("inspections.id"), nullable=False)
    rule_id = Column(String(36), ForeignKey("compliance_rules.id"), nullable=False)
    field_name = Column(String, nullable=False)
    detected_value = Column(String, nullable=True)
    expected_condition = Column(String, nullable=True)
    status = Column(Enum(ResultStatus), nullable=False)
    severity = Column(String, nullable=True)
    confidence = Column(Float, nullable=True)
    legal_reference = Column(String, nullable=True)
    explanation = Column(String, nullable=True)
    recommendation = Column(String, nullable=True)
    evidence = Column(JSON, nullable=True)

    inspection = relationship("Inspection", back_populates="compliance_results")
    rule = relationship("ComplianceRule")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_id = Column(String(36), ForeignKey("inspections.id"), nullable=False)
    report_type = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    generated_by = Column(String(36), ForeignKey("users.id"), nullable=False)
    generated_at = Column(DateTime, default=datetime.utcnow)
