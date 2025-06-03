from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class MembershipCreate(BaseModel):
    user_id: int
    type: str
    status: str
    start_date: date
    end_date: Optional[date] = None

class MembershipRead(BaseModel):
    id: int
    user_id: int
    type: str
    status: str
    start_date: date
    end_date: Optional[date]
    created_at: datetime
    updated_at: datetime

class MembershipUpdate(BaseModel):
    type: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None 