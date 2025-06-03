from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FounderProfileRead(BaseModel):
    id: int
    user_id: int
    bio: Optional[str]
    company: Optional[str]
    website: Optional[str]
    created_at: datetime
    updated_at: datetime 