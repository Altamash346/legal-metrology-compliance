from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.services.dashboard_service import DashboardService
from app.schemas.dashboard import DashboardStats, TrendData, ViolationBreakdown
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
async def get_stats(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = DashboardService(db)
    return await service.get_stats()

@router.get("/trends", response_model=TrendData)
async def get_trends(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = DashboardService(db)
    return await service.get_trends()

@router.get("/violations", response_model=ViolationBreakdown)
async def get_violations(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = DashboardService(db)
    return await service.get_violation_breakdown()
