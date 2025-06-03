from pydantic import BaseModel
from datetime import datetime

class MeetupPhotoRead(BaseModel):
    id: int
    meetup_id: int
    file_path: str
    uploaded_at: datetime 