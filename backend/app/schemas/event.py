from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    accessible_memberships: Optional[List[str]] = None
    payment_required: Optional[bool] = False
    status: Optional[str] = "active"

class EventRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    start_time: datetime
    end_time: Optional[datetime]
    location: Optional[str]
    accessible_memberships: Optional[List[str]]
    payment_required: bool
    status: str
    created_at: datetime
    updated_at: datetime

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    accessible_memberships: Optional[List[str]] = None
    payment_required: Optional[bool] = None
    status: Optional[str] = None 