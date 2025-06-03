from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.content import ContentCreate, ContentRead, ContentUpdate
from app.services import content_service
from app.api.deps import get_current_active_user
from app.models.user import User
from app.services.audit_log_service import log_action

router = APIRouter()

def admin_or_superadmin_required(current_user: User = Depends(get_current_active_user)):
    if current_user.role not in ("superadmin", "admin"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin or SuperAdmin access required")
    return current_user

@router.get("/content", response_model=list[ContentRead])
async def list_content():
    contents = await content_service.get_all_content()
    return [
        ContentRead(
            id=c.id,
            type=c.type,
            title=c.title,
            body=c.body,
            tags=c.tags,
            status=c.status,
            author_id=c.author_id,
            created_at=c.created_at,
            updated_at=c.updated_at
        ) for c in contents
    ]

@router.get("/content/{content_id}", response_model=ContentRead)
async def get_content(content_id: int):
    content = await content_service.get_content_by_id(content_id)
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return ContentRead(
        id=content.id,
        type=content.type,
        title=content.title,
        body=content.body,
        tags=content.tags,
        status=content.status,
        author_id=content.author_id,
        created_at=content.created_at,
        updated_at=content.updated_at
    )

@router.post("/content", response_model=ContentRead, dependencies=[Depends(admin_or_superadmin_required)])
async def create_content(content_in: ContentCreate, current_user=Depends(get_current_active_user)):
    content = await content_service.create_content(**content_in.dict())
    if current_user.role == "superadmin":
        await log_action(
            user_id=current_user.id,
            action="create_content",
            resource="content",
            resource_id=content.id,
            details=content_in.dict()
        )
    return ContentRead(
        id=content.id,
        type=content.type,
        title=content.title,
        body=content.body,
        tags=content.tags,
        status=content.status,
        author_id=content.author_id,
        created_at=content.created_at,
        updated_at=content.updated_at
    )

@router.patch("/content/{content_id}", response_model=ContentRead, dependencies=[Depends(admin_or_superadmin_required)])
async def update_content(content_id: int, content_in: ContentUpdate, current_user=Depends(get_current_active_user)):
    content = await content_service.update_content(content_id, **content_in.dict(exclude_unset=True))
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    if current_user.role == "superadmin":
        await log_action(
            user_id=current_user.id,
            action="update_content",
            resource="content",
            resource_id=content_id,
            details=content_in.dict(exclude_unset=True)
        )
    return ContentRead(
        id=content.id,
        type=content.type,
        title=content.title,
        body=content.body,
        tags=content.tags,
        status=content.status,
        author_id=content.author_id,
        created_at=content.created_at,
        updated_at=content.updated_at
    )

@router.delete("/content/{content_id}", status_code=204, dependencies=[Depends(admin_or_superadmin_required)])
async def delete_content(content_id: int, current_user=Depends(get_current_active_user)):
    deleted = await content_service.delete_content(content_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Content not found")
    if current_user.role == "superadmin":
        await log_action(
            user_id=current_user.id,
            action="delete_content",
            resource="content",
            resource_id=content_id,
            details=None
        )
    return None 