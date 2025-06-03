from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.audit_log import AuditLogRead
from app.models.audit_log import AuditLog
from app.api.deps import get_current_active_user
from typing import List

router = APIRouter(prefix="/admin/audit-logs", tags=["admin-audit-logs"])

def superadmin_required(current_user = Depends(get_current_active_user)):
    if current_user.role != "superadmin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="SuperAdmin access required")
    return current_user

@router.get("/", response_model=List[AuditLogRead], dependencies=[Depends(superadmin_required)])
async def list_audit_logs():
    logs = await AuditLog.all().order_by("-timestamp")
    return [AuditLogRead(
        id=l.id,
        user_id=l.user_id,
        action=l.action,
        resource=l.resource,
        resource_id=l.resource_id,
        details=l.details,
        timestamp=l.timestamp
    ) for l in logs]

@router.get("/{log_id}", response_model=AuditLogRead, dependencies=[Depends(superadmin_required)])
async def get_audit_log(log_id: int):
    log = await AuditLog.get_or_none(id=log_id)
    if not log:
        raise HTTPException(status_code=404, detail="Audit log not found")
    return AuditLogRead(
        id=log.id,
        user_id=log.user_id,
        action=log.action,
        resource=log.resource,
        resource_id=log.resource_id,
        details=log.details,
        timestamp=log.timestamp
    ) 