from fastapi import APIRouter, HTTPException, status, Depends, Query
from app.schemas.intern import InternProfileRead
from app.services import intern_service
from app.api.deps import get_current_active_user
from app.models.user import User
from typing import Optional

router = APIRouter()

def founder_required(current_user: User = Depends(get_current_active_user)):
    if current_user.role != "founder":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Founder access required")
    return current_user

@router.get("/interns/{user_id}", response_model=InternProfileRead)
async def get_intern_profile(user_id: int):
    profile = await intern_service.get_intern_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Intern profile not found")
    return InternProfileRead(
        id=profile.id,
        user_id=profile.user_id,
        bio=profile.bio,
        skills=profile.skills,
        is_star=profile.is_star,
        is_listed=profile.is_listed,
        created_at=profile.created_at,
        updated_at=profile.updated_at
    )

@router.get("/interns", response_model=list[InternProfileRead])
async def list_interns(is_listed: Optional[bool] = Query(None)):
    profiles = await intern_service.list_interns(is_listed)
    return [
        InternProfileRead(
            id=p.id,
            user_id=p.user_id,
            bio=p.bio,
            skills=p.skills,
            is_star=p.is_star,
            is_listed=p.is_listed,
            created_at=p.created_at,
            updated_at=p.updated_at
        ) for p in profiles
    ]

@router.get("/interns/starred", response_model=list[InternProfileRead], dependencies=[Depends(founder_required)])
async def list_star_interns():
    profiles = await intern_service.list_star_interns()
    return [
        InternProfileRead(
            id=p.id,
            user_id=p.user_id,
            bio=p.bio,
            skills=p.skills,
            is_star=p.is_star,
            is_listed=p.is_listed,
            created_at=p.created_at,
            updated_at=p.updated_at
        ) for p in profiles
    ] 