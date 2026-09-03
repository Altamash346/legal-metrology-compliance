import uuid
from typing import Dict, Any
from app.reports.pdf_generator import PDFGenerator
from app.reports.docx_generator import DocxGenerator
from app.utils.storage import storage

class ReportService:
    def __init__(self, db=None):
        self.db = db

    async def generate_report(self, inspection_id: uuid.UUID, report_type: str, data: Dict[str, Any]) -> str:
        filename = f"report_{inspection_id}_{report_type}.{report_type}"
        filepath = storage.get_file_path(f"reports/{filename}")
        
        if report_type == "pdf":
            generator = PDFGenerator()
            generator.generate(filepath, data)
        elif report_type == "docx":
            generator = DocxGenerator()
            generator.generate(filepath, data)
        else:
            raise ValueError(f"Unsupported report type: {report_type}")
            
        return filepath
