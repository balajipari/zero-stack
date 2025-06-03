from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.membership import MembershipCreate, MembershipRead, MembershipUpdate
from app.services import membership_service
from app.api.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

# SuperAdmin check dependency
def superadmin_required(current_user: User = Depends(get_current_active_user)):
    if current_user.role != "superadmin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="SuperAdmin access required")
    return current_user

@router.post("/memberships", response_model=MembershipRead, dependencies=[Depends(superadmin_required)])
async def create_membership(membership_in: MembershipCreate):
    membership = await membership_service.create_membership(**membership_in.dict())
    return MembershipRead(
        id=membership.id,
        user_id=membership.user_id,
        type=membership.type,
        status=membership.status,
        start_date=membership.start_date,
        end_date=membership.end_date,
        created_at=membership.created_at,
        updated_at=membership.updated_at
    )

@router.get("/users/{user_id}/memberships", response_model=list[MembershipRead])
async def get_user_memberships(user_id: int):
    memberships = await membership_service.get_memberships_by_user(user_id)
    return [
        MembershipRead(
            id=m.id,
            user_id=m.user_id,
            type=m.type,
            status=m.status,
            start_date=m.start_date,
            end_date=m.end_date,
            created_at=m.created_at,
            updated_at=m.updated_at
        ) for m in memberships
    ]

@router.patch("/memberships/{membership_id}", response_model=MembershipRead, dependencies=[Depends(superadmin_required)])
async def update_membership(membership_id: int, membership_in: MembershipUpdate):
    membership = await membership_service.update_membership(membership_id, **membership_in.dict(exclude_unset=True))
    if not membership:
        raise HTTPException(status_code=404, detail="Membership not found")
    return MembershipRead(
        id=membership.id,
        user_id=membership.user_id,
        type=membership.type,
        status=membership.status,
        start_date=membership.start_date,
        end_date=membership.end_date,
        created_at=membership.created_at,
        updated_at=membership.updated_at
    )

@router.delete("/memberships/{membership_id}", status_code=204, dependencies=[Depends(superadmin_required)])
async def delete_membership(membership_id: int):
    deleted = await membership_service.delete_membership(membership_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Membership not found")
    return None 