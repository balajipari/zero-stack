from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str = Field(..., pattern="^(superadmin|builder|founder|intern)$")
    profile: Optional[str] = None

class UserRead(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    profile: Optional[str]
    verification_status: bool
    created_at: datetime

class UserUpdate(BaseModel):
    name: Optional[str] = None
    profile: Optional[str] = None
    password: Optional[str] = None

class UserInDB(UserRead):
    password_hash: str
