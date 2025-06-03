from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MeetupCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: Optional[str] = None
    status: Optional[str] = "active"

class MeetupRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    date: datetime
    location: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

class MeetupUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    location: Optional[str] = None
    status: Optional[str] = None 