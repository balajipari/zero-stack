from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventRegistrationCreate(BaseModel):
    user_id: int
    event_id: int
    status: Optional[str] = "registered"

class EventRegistrationRead(BaseModel):
    id: int
    user_id: int
    event_id: int
    registered_at: datetime
    status: str 