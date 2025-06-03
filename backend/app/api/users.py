from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserCreate, UserRead
from app.services import user_service
from app.utils.jwt import create_access_token
from tortoise.transactions import in_transaction

router = APIRouter(prefix="/auth")

@router.post("/register", response_model=UserRead)
async def register(user_in: UserCreate):
    async with in_transaction():
        existing = await user_service.get_user_by_email(user_in.email)
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        user = await user_service.create_user(
            name=user_in.name,
            email=user_in.email,
            password=user_in.password,
            role=user_in.role,
            profile=user_in.profile
        )
        return UserRead.from_orm(user)

@router.post("/login")
async def login(form_data: UserCreate):
    user = await user_service.authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
