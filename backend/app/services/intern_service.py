from app.models.intern import InternProfile
from typing import List, Optional

async def get_intern_profile_by_user_id(user_id: int) -> Optional[InternProfile]:
    return await InternProfile.get_or_none(user_id=user_id)

async def list_star_interns() -> List[InternProfile]:
    return await InternProfile.filter(is_star=True, is_listed=True).all()

async def list_interns(is_listed: Optional[bool] = None) -> List[InternProfile]:
    qs = InternProfile.all()
    if is_listed is not None:
        qs = qs.filter(is_listed=is_listed)
    return await qs 