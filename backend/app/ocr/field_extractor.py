import re
from typing import Dict, Any, List

FIELD_ALIASES = {
    "product_name": ["product name", "item name", "commodity"],
    "brand_name": ["brand", "trademark"],
    "manufacturer_name": ["manufactured by", "mfg by", "manufacturer"],
    "manufacturer_address": ["manufactured at", "mfg address", "address"],
    "packer_name": ["packed by", "packer"],
    "packer_address": ["packer address"],
    "importer_name": ["imported by", "importer"],
    "importer_address": ["importer address"],
    "country_of_origin": ["country of origin", "made in", "product of"],
    "net_quantity": ["net qty", "net weight", "net volume", "net quantity"],
    "mrp": ["mrp", "max retail price", "maximum retail price", "price"],
    "manufacturing_date": ["mfg date", "pkd date", "manufactured on", "mfg"],
    "expiry_date": ["exp date", "expiry", "use by"],
    "best_before": ["best before", "bb"],
    "batch_number": ["batch no", "lot no", "batch", "lot"],
    "consumer_care_number": ["consumer care", "customer care", "toll free", "contact"],
    "consumer_care_email": ["email", "feedback"],
    "fssai_number": ["fssai", "lic no", "license"],
    "barcode_number": ["barcode", "ean"],
    "ingredients": ["ingredients", "made from"],
    "nutritional_info": ["nutrition", "nutritional information"],
    "allergen_info": ["contains", "allergens"],
    "generic_name": ["generic name", "common name"]
}

class FieldExtractor:
    def __init__(self):
        pass

    def extract_fields(self, full_text: str, text_regions: Dict[str, Any]) -> List[Dict[str, Any]]:
        extracted = []
        lines = full_text.split("\n")
        
        # Simple extraction logic based on keywords
        for canonical, aliases in FIELD_ALIASES.items():
            for line in lines:
                lower_line = line.lower()
                for alias in aliases:
                    if alias in lower_line:
                        # Extract the part after the colon or keyword
                        parts = re.split(rf'{alias}\s*[:\-]?\s*', lower_line, flags=re.IGNORECASE)
                        if len(parts) > 1 and parts[1].strip():
                            value = parts[1].strip()
                            
                            # Normalization
                            if canonical == "mrp":
                                value = value.replace("rs.", "").replace("₹", "").strip()
                            
                            extracted.append({
                                "field_name": canonical,
                                "raw_value": line,
                                "normalized_value": value,
                                "confidence": 0.85, # mock confidence
                                "extraction_method": "keyword_match",
                                "bounding_box": {} # omitted for brevity
                            })
                            break
                else:
                    continue
                break
        return extracted
