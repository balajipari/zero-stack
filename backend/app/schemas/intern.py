from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class InternProfileRead(BaseModel):
    id: int
    user_id: int
    bio: Optional[str]
    skills: Optional[List[str]]
    is_star: bool
    is_listed: bool
    created_at: datetime
    updated_at: datetime 