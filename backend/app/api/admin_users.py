from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserRead, UserUpdate
from app.models.user import User
from app.api.deps import get_current_active_user
from typing import List
from app.services.audit_log_service import log_action

router = APIRouter(prefix="/admin/users", tags=["admin-users"])

def superadmin_required(current_user = Depends(get_current_active_user)):
    if current_user.role != "superadmin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="SuperAdmin access required")
    return current_user

@router.get("/", response_model=List[UserRead], dependencies=[Depends(superadmin_required)])
async def list_users():
    users = await User.all()
    return [UserRead(
        id=u.id,
        name=u.name,
        email=u.email,
        role=u.role,
        profile=u.profile,
        verification_status=u.verification_status,
        created_at=u.created_at
    ) for u in users]

@router.get("/{user_id}", response_model=UserRead, dependencies=[Depends(superadmin_required)])
async def get_user(user_id: int):
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserRead(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        profile=user.profile,
        verification_status=user.verification_status,
        created_at=user.created_at
    )

@router.patch("/{user_id}", response_model=UserRead, dependencies=[Depends(superadmin_required)])
async def update_user(user_id: int, user_in: UserUpdate, current_user=Depends(get_current_active_user)):
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    update_data = user_in.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(user, key, value)
    await user.save()
    await log_action(
        user_id=current_user.id,
        action="update_user",
        resource="user",
        resource_id=user_id,
        details=update_data
    )
    return UserRead(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        profile=user.profile,
        verification_status=user.verification_status,
        created_at=user.created_at
    )

@router.delete("/{user_id}", status_code=204, dependencies=[Depends(superadmin_required)])
async def delete_user(user_id: int, current_user=Depends(get_current_active_user)):
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await user.delete()
    await log_action(
        user_id=current_user.id,
        action="delete_user",
        resource="user",
        resource_id=user_id,
        details=None
    )
    return None 