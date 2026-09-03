import time
import logging
from typing import Dict, Any, Tuple
import cv2

logger = logging.getLogger(__name__)

class MockOCR:
    def ocr(self, img_path, cls=True):
        logger.info("Using Mock OCR engine")
        # Return fake data format: [[[[x,y],...], ("text", confidence)], ...]
        return [[
            [[[0,0], [100,0], [100,20], [0,20]], ("Net Quantity: 500g", 0.95)],
            [[[0,30], [100,30], [100,50], [0,50]], ("MRP: Rs. 150 inclusive of all taxes", 0.98)],
            [[[0,60], [100,60], [100,80], [0,80]], ("Mfg Date: 12/2023", 0.92)],
            [[[0,90], [100,90], [100,110], [0,110]], ("FSSAI: 12345678901234", 0.99)],
            [[[0,120], [100,120], [100,140], [0,140]], ("Manufacturer: XYZ Corp", 0.85)],
            [[[0,150], [100,150], [100,170], [0,170]], ("Address: 123 Main St, Mumbai", 0.88)]
        ]]

class OCREngine:
    def __init__(self, use_gpu: bool = False):
        try:
            from paddleocr import PaddleOCR
            self.engine = PaddleOCR(use_angle_cls=True, lang='en', use_gpu=use_gpu)
            self.is_mock = False
        except ImportError:
            logger.warning("PaddleOCR not installed, falling back to MockOCR")
            self.engine = MockOCR()
            self.is_mock = True

    def extract_text(self, image_path: str) -> Tuple[str, float, Dict[str, Any], int]:
        start_time = time.time()
        
        try:
            result = self.engine.ocr(image_path, cls=True)
            
            full_text = []
            total_conf = 0.0
            count = 0
            regions = []
            
            if result and result[0]:
                for idx, line in enumerate(result[0]):
                    bbox, (text, conf) = line
                    full_text.append(text)
                    total_conf += conf
                    count += 1
                    regions.append({
                        "id": idx,
                        "text": text,
                        "confidence": float(conf),
                        "box": bbox
                    })
                    
            avg_conf = (total_conf / count) if count > 0 else 0.0
            combined_text = "\n".join(full_text)
            
            processing_time = int((time.time() - start_time) * 1000)
            
            return combined_text, avg_conf, {"regions": regions}, processing_time
            
        except Exception as e:
            logger.error(f"OCR Error: {e}")
            return "", 0.0, {"regions": []}, int((time.time() - start_time) * 1000)

    def draw_annotations(self, image_path: str, regions: Dict[str, Any], output_path: str):
        img = cv2.imread(image_path)
        if img is None:
            return
            
        for region in regions.get("regions", []):
            box = region["box"]
            points = [(int(p[0]), int(p[1])) for p in box]
            cv2.polylines(img, [np.array(points)], True, (0, 255, 0), 2)
            cv2.putText(img, f"{region['confidence']:.2f}", points[0], cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 1)
            
        cv2.imwrite(output_path, img)
