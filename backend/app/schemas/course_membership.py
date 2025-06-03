from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CourseMembershipCreate(BaseModel):
    user_id: int
    course_id: int
    cohort_id: Optional[int] = None
    status: Optional[str] = "active"

class CourseMembershipRead(BaseModel):
    id: int
    user_id: int
    course_id: int
    cohort_id: Optional[int]
    enrolled_at: datetime
    status: str 