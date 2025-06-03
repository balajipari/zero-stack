from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class CohortCreate(BaseModel):
    course_id: int
    name: str
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = "active"

class CohortRead(BaseModel):
    id: int
    course_id: int
    name: str
    start_date: Optional[date]
    end_date: Optional[date]
    status: str
    created_at: datetime
    updated_at: datetime

class CohortUpdate(BaseModel):
    name: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    status: Optional[str] = None 