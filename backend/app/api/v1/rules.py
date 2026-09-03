from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database import get_db
from app.schemas.rule import RuleCreate, RuleUpdate, RuleResponse, RuleImportRequest, RuleExportResponse
from app.models.rule import ComplianceRule
from app.api.deps import get_current_user, require_role
from app.models.user import User, RoleEnum
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=list[RuleResponse])
async def list_rules(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(ComplianceRule).order_by(ComplianceRule.display_order))
    rules = result.scalars().all()
    return [RuleResponse.model_validate(r) for r in rules]

@router.post("/", response_model=RuleResponse)
async def create_rule(
    rule_in: RuleCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.ADMIN]))
):
    rule = ComplianceRule(**rule_in.model_dump())
    db.add(rule)
    await db.commit()
    await db.refresh(rule)
    return RuleResponse.model_validate(rule)

@router.get("/{rule_id}", response_model=RuleResponse)
async def get_rule(
    rule_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(ComplianceRule).where(ComplianceRule.id == rule_id))
    rule = result.scalar_one_or_none()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    return RuleResponse.model_validate(rule)

@router.put("/{rule_id}", response_model=RuleResponse)
async def update_rule(
    rule_id: str,
    rule_in: RuleUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.ADMIN]))
):
    result = await db.execute(select(ComplianceRule).where(ComplianceRule.id == rule_id))
    rule = result.scalar_one_or_none()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    
    update_data = rule_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(rule, key, value)
    rule.updated_at = datetime.utcnow()
    await db.commit()
    await db.refresh(rule)
    return RuleResponse.model_validate(rule)

@router.delete("/{rule_id}")
async def delete_rule(
    rule_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.ADMIN]))
):
    result = await db.execute(select(ComplianceRule).where(ComplianceRule.id == rule_id))
    rule = result.scalar_one_or_none()
    if not rule:
        raise HTTPException(status_code=404, detail="Rule not found")
    await db.delete(rule)
    await db.commit()
    return {"message": "Rule deleted"}

@router.post("/import", response_model=dict)
async def import_rules(
    data: RuleImportRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_role([RoleEnum.ADMIN]))
):
    imported = 0
    for rule_data in data.rules:
        existing = await db.execute(
            select(ComplianceRule).where(ComplianceRule.rule_id == rule_data.rule_id)
        )
        if existing.scalar_one_or_none():
            continue
        rule = ComplianceRule(**rule_data.model_dump())
        db.add(rule)
        imported += 1
    await db.commit()
    return {"message": f"Imported {imported} rules", "imported": imported}

@router.get("/export/all", response_model=RuleExportResponse)
async def export_rules(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(ComplianceRule).order_by(ComplianceRule.display_order))
    rules = result.scalars().all()
    return RuleExportResponse(
        rules=[RuleResponse.model_validate(r) for r in rules]
    )
