from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime

class AuditLogRead(BaseModel):
    id: int
    user_id: int
    action: str
    resource: str
    resource_id: Optional[int]
    details: Optional[Any]
    timestamp: datetime 