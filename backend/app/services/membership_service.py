from app.models.membership import Membership
from typing import List, Optional
from datetime import date

async def create_membership(user_id: int, type: str, status: str, start_date: date, end_date: Optional[date] = None):
    membership = await Membership.create(
        user_id=user_id,
        type=type,
        status=status,
        start_date=start_date,
        end_date=end_date
    )
    return membership

async def get_membership_by_id(membership_id: int):
    return await Membership.get_or_none(id=membership_id)

async def get_memberships_by_user(user_id: int) -> List[Membership]:
    return await Membership.filter(user_id=user_id).all()

async def update_membership(membership_id: int, **kwargs):
    membership = await Membership.get_or_none(id=membership_id)
    if not membership:
        return None
    for key, value in kwargs.items():
        setattr(membership, key, value)
    await membership.save()
    return membership

async def delete_membership(membership_id: int):
    membership = await Membership.get_or_none(id=membership_id)
    if membership:
        await membership.delete()
        return True
    return False 