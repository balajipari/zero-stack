from app.models.user import User
from app.utils.password import hash_password, verify_password
from tortoise.exceptions import DoesNotExist

async def create_user(name: str, email: str, password: str, role: str, profile: str = None):
    hashed_pw = hash_password(password)
    user = await User.create(
        name=name,
        email=email,
        password_hash=hashed_pw,
        role=role,
        profile=profile
    )
    return user

async def authenticate_user(email: str, password: str):
    try:
        user = await User.get(email=email)
    except DoesNotExist:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

async def get_user_by_email(email: str):
    return await User.get_or_none(email=email)
