from pydantic import BaseModel
from typing import List, Dict, Any

class DashboardStats(BaseModel):
    total_inspections: int
    compliant_count: int
    non_compliant_count: int
    requires_review_count: int
    resolved_count: int
    pending_count: int

class TrendDataPoint(BaseModel):
    date: str
    count: int

class TrendData(BaseModel):
    trends: List[TrendDataPoint]

class ViolationBreakdownItem(BaseModel):
    rule_id: str
    title: str
    count: int

class ViolationBreakdown(BaseModel):
    violations: List[ViolationBreakdownItem]
