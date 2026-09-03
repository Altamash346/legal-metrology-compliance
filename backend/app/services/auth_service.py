from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, TokenResponse, UserResponse
from app.utils.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def register_user(self, user_in: UserCreate) -> UserResponse:
        result = await self.db.execute(select(User).where(User.email == user_in.email))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Email already registered")
            
        db_user = User(
            email=user_in.email,
            password_hash=hash_password(user_in.password),
            full_name=user_in.full_name,
            phone=user_in.phone,
            role=user_in.role,
            organization_type=user_in.organization_type
        )
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        return UserResponse.model_validate(db_user)

    async def authenticate_user(self, login_in: UserLogin) -> TokenResponse:
        result = await self.db.execute(select(User).where(User.email == login_in.email))
        user = result.scalar_one_or_none()
        
        if not user or not verify_password(login_in.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
            
        access_token = create_access_token(data={"sub": str(user.id)})
        return TokenResponse(access_token=access_token)

    async def get_user_by_id(self, user_id: str) -> User:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()
