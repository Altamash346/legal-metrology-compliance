from sqlalchemy import Column, String, Float, DateTime, Enum, ForeignKey, Integer, Boolean, JSON
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
import enum
from app.database import Base

class ComplianceStatus(str, enum.Enum):
    COMPLIANT = "COMPLIANT"
    NON_COMPLIANT = "NON_COMPLIANT"
    REQUIRES_REVIEW = "REQUIRES_REVIEW"

class Inspection(Base):
    __tablename__ = "inspections"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_number = Column(String, unique=True, index=True, nullable=False)
    inspector_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    product_name = Column(String, nullable=True)
    brand_name = Column(String, nullable=True)
    commodity_type = Column(String, nullable=True)
    product_category = Column(String, nullable=True)
    product_metadata = Column(JSON, nullable=True)
    compliance_score = Column(Float, nullable=True)
    compliance_status = Column(Enum(ComplianceStatus), nullable=True)
    resolution_status = Column(String, nullable=True)
    inspector_notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    images = relationship("InspectionImage", back_populates="inspection")
    ocr_results = relationship("OcrResult", back_populates="inspection")
    extracted_fields = relationship("ExtractedField", back_populates="inspection")
    compliance_results = relationship("ComplianceResult", back_populates="inspection")

class InspectionImage(Base):
    __tablename__ = "inspection_images"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_id = Column(String(36), ForeignKey("inspections.id"), nullable=False)
    label_side = Column(String, nullable=True)
    original_path = Column(String, nullable=False)
    processed_path = Column(String, nullable=True)
    annotated_path = Column(String, nullable=True)
    dimensions = Column(String, nullable=True)
    file_type = Column(String, nullable=True)
    file_size = Column(Integer, nullable=True)

    inspection = relationship("Inspection", back_populates="images")
    ocr_results = relationship("OcrResult", back_populates="image")

class OcrResult(Base):
    __tablename__ = "ocr_results"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    image_id = Column(String(36), ForeignKey("inspection_images.id"), nullable=False)
    inspection_id = Column(String(36), ForeignKey("inspections.id"), nullable=False)
    full_text = Column(String, nullable=True)
    overall_confidence = Column(Float, nullable=True)
    detected_language = Column(String, nullable=True)
    text_regions = Column(JSON, nullable=True)
    processing_time_ms = Column(Integer, nullable=True)
    ocr_engine = Column(String, nullable=True)

    image = relationship("InspectionImage", back_populates="ocr_results")
    inspection = relationship("Inspection", back_populates="ocr_results")

class ExtractedField(Base):
    __tablename__ = "extracted_fields"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    inspection_id = Column(String(36), ForeignKey("inspections.id"), nullable=False)
    ocr_result_id = Column(String(36), ForeignKey("ocr_results.id"), nullable=True)
    field_name = Column(String, nullable=False)
    raw_value = Column(String, nullable=True)
    normalized_value = Column(String, nullable=True)
    corrected_value = Column(String, nullable=True)
    corrected_by = Column(String(36), ForeignKey("users.id"), nullable=True)
    corrected_at = Column(DateTime, nullable=True)
    confidence = Column(Float, nullable=True)
    extraction_method = Column(String, nullable=True)
    bounding_box = Column(JSON, nullable=True)
    source_image_id = Column(String(36), ForeignKey("inspection_images.id"), nullable=True)
    is_manually_corrected = Column(Boolean, default=False)

    inspection = relationship("Inspection", back_populates="extracted_fields")
