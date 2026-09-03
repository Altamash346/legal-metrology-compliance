import pytest
from app.ocr.field_extractor import FieldExtractor

def test_field_extraction():
    extractor = FieldExtractor()
    full_text = "Net Quantity: 500g\nMRP: Rs. 150 inclusive of all taxes\nMfg Date: 12/2023"
    
    fields = extractor.extract_fields(full_text, {})
    assert len(fields) > 0
    
    field_names = [f["field_name"] for f in fields]
    assert "net_quantity" in field_names
    assert "mrp" in field_names
    assert "manufacturing_date" in field_names
