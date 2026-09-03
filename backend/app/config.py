from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///./lmcc.db"
    JWT_SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    REDIS_URL: str = "redis://localhost:6379"
    STORAGE_PATH: str = os.path.join(os.getcwd(), "storage")
    CORS_ORIGINS: List[str] = ["*"]
    
    # OCR Settings
    OCR_ENGINE: str = "paddleocr"
    OCR_USE_GPU: bool = False
    
    # Admin Seed
    ADMIN_EMAIL: str = "admin@example.com"
    ADMIN_PASSWORD: str = "admin123"

    class Config:
        env_file = ".env"

settings = Settings()
