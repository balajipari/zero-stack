from fastapi import Depends
from app.core.security import get_current_user

async def get_current_active_user(current_user = Depends(get_current_user)):
    # Add checks for active/verified if needed
    return current_user
