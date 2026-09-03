import os
import aiofiles
import uuid
from pathlib import Path
from app.config import settings
from fastapi import UploadFile

class StorageService:
    def __init__(self):
        self.base_path = Path(settings.STORAGE_PATH)
        self.folders = ['uploads', 'processed', 'annotated', 'reports']
        for folder in self.folders:
            (self.base_path / folder).mkdir(parents=True, exist_ok=True)

    async def save_file(self, file: UploadFile, folder: str = 'uploads') -> str:
        ext = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{ext}"
        filepath = self.base_path / folder / filename
        
        async with aiofiles.open(filepath, 'wb') as out_file:
            content = await file.read()
            await out_file.write(content)
            
        return str(filepath)

    def get_file_path(self, relative_path: str) -> str:
        return str(self.base_path / relative_path)

    def delete_file(self, path: str):
        filepath = Path(path)
        if filepath.exists():
            filepath.unlink()

storage = StorageService()
