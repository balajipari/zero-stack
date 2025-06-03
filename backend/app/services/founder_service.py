from app.models.founder import FounderProfile
from typing import Optional

async def get_founder_profile_by_user_id(user_id: int) -> Optional[FounderProfile]:
    return await FounderProfile.get_or_none(user_id=user_id) 