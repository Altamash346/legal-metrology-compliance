import re
from typing import Dict, Any, List
import difflib

FIELD_ALIASES = {
    "product_name": ["product name", "item name", "commodity"],
    "brand_name": ["brand", "trademark"],
    "manufacturer_name": ["manufactured by", "mfg by", "manufacturer", "manuacturer"],
    "manufacturer_address": ["manufactured at", "mfg address", "address", "paidress"],
    "packer_name": ["packed by", "packer"],
    "packer_address": ["packer address"],
    "importer_name": ["imported by", "importer"],
    "importer_address": ["importer address"],
    "country_of_origin": ["country of origin", "made in", "product of"],
    "net_quantity": ["net qty", "net weight", "net volume", "net quantity", "netaty"],
    "mrp": ["mrp", "max retail price", "maximum retail price", "price"],
    "manufacturing_date": ["mfg date", "pkd date", "manufactured on", "mfg"],
    "expiry_date": ["exp date", "expiry", "use by"],
    "best_before": ["best before", "bb"],
    "batch_number": ["batch no", "lot no", "batch", "lot"],
    "consumer_care_number": ["consumer care", "customer care", "toll free", "contact"],
    "consumer_care_email": ["email", "feedback"],
    "fssai_number": ["fssai", "lic no", "license", "fssa"],
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
        
        for canonical, aliases in FIELD_ALIASES.items():
            found = False
            for line in lines:
                lower_line = line.lower().strip()
                if not lower_line: continue
                
                for alias in aliases:
                    # Check for substring match or close fuzzy match
                    if alias in lower_line or any(difflib.SequenceMatcher(None, alias, word).ratio() > 0.85 for word in lower_line.split()):
                        
                        # Use a more lenient regex to split at the keyword and common separators (: . -)
                        parts = re.split(rf'{alias}\s*[:\-.]?\s*', lower_line, flags=re.IGNORECASE)
                        
                        if len(parts) > 1 and parts[-1].strip():
                            value = parts[-1].strip()
                        else:
                            # If no separator was found, the value might be the next words
                            value = lower_line.replace(alias, "").strip(" :.-")
                            
                        if value:
                            if canonical == "mrp":
                                value = value.replace("rs.", "").replace("₹", "").replace("rs", "").strip()
                                
                            extracted.append({
                                "field_name": canonical,
                                "raw_value": line,
                                "normalized_value": value,
                                "confidence": 0.85,
                                "extraction_method": "keyword_match",
                                "bounding_box": {}
                            })
                            found = True
                            break
                if found:
                    break
                    
        return extracted
