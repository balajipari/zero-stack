from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CourseCreate(BaseModel):
    title: str
    description: Optional[str] = None
    accessible_memberships: Optional[List[str]] = None
    status: Optional[str] = "active"

class CourseRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    accessible_memberships: Optional[List[str]]
    status: str
    created_at: datetime
    updated_at: datetime

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    accessible_memberships: Optional[List[str]] = None
    status: Optional[str] = None 