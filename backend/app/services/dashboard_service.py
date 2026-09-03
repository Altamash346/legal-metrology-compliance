from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from app.models.inspection import Inspection, ComplianceStatus
from app.models.compliance import ComplianceResult, ResultStatus
from app.schemas.dashboard import DashboardStats, TrendData, TrendDataPoint, ViolationBreakdown, ViolationBreakdownItem
from datetime import datetime, timedelta

class DashboardService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_stats(self) -> DashboardStats:
        total = await self.db.scalar(select(func.count()).select_from(Inspection)) or 0
        comp = await self.db.scalar(select(func.count()).select_from(Inspection).where(Inspection.compliance_status == ComplianceStatus.COMPLIANT)) or 0
        ncomp = await self.db.scalar(select(func.count()).select_from(Inspection).where(Inspection.compliance_status == ComplianceStatus.NON_COMPLIANT)) or 0
        req = await self.db.scalar(select(func.count()).select_from(Inspection).where(Inspection.compliance_status == ComplianceStatus.REQUIRES_REVIEW)) or 0
        
        return DashboardStats(
            total_inspections=total,
            compliant_count=comp,
            non_compliant_count=ncomp,
            requires_review_count=req,
            resolved_count=0,
            pending_count=req
        )

    async def get_trends(self) -> TrendData:
        # Mock trend for demo
        today = datetime.utcnow().date()
        points = []
        for i in range(7):
            d = today - timedelta(days=6-i)
            points.append(TrendDataPoint(date=d.isoformat(), count=i*2+1))
        return TrendData(trends=points)

    async def get_violation_breakdown(self) -> ViolationBreakdown:
        # Simplistic grouping
        result = await self.db.execute(
            select(ComplianceResult.rule_id, func.count(ComplianceResult.id).label('count'))
            .where(ComplianceResult.status == ResultStatus.FAIL)
            .group_by(ComplianceResult.rule_id)
            .limit(10)
        )
        violations = []
        for row in result.all():
            violations.append(ViolationBreakdownItem(rule_id=str(row[0]), title="Violation Rule", count=row[1]))
        return ViolationBreakdown(violations=violations)
