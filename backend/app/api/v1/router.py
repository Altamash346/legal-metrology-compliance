from fastapi import APIRouter
from app.api.v1 import auth, inspections, rules, dashboard

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(inspections.router, prefix="/inspections", tags=["inspections"])
api_router.include_router(rules.router, prefix="/rules", tags=["rules"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
