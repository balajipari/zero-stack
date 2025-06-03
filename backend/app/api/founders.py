from fastapi import APIRouter, HTTPException
from app.schemas.founder import FounderProfileRead
from app.services import founder_service

router = APIRouter()

@router.get("/founders/{user_id}", response_model=FounderProfileRead)
async def get_founder_profile(user_id: int):
    profile = await founder_service.get_founder_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Founder profile not found")
    return FounderProfileRead(
        id=profile.id,
        user_id=profile.user_id,
        bio=profile.bio,
        company=profile.company,
        website=profile.website,
        created_at=profile.created_at,
        updated_at=profile.updated_at
    ) 