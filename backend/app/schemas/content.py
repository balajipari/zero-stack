from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class ContentCreate(BaseModel):
    type: str
    title: str
    body: str
    tags: Optional[List[str]] = None
    status: str
    author_id: int

class ContentRead(BaseModel):
    id: int
    type: str
    title: str
    body: str
    tags: Optional[List[str]]
    status: str
    author_id: int
    created_at: datetime
    updated_at: datetime

class ContentUpdate(BaseModel):
    type: Optional[str] = None
    title: Optional[str] = None
    body: Optional[str] = None
    tags: Optional[List[str]] = None
    status: Optional[str] = None 