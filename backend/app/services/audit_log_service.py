from app.models.audit_log import AuditLog
from typing import Any, Optional

async def log_action(user_id: int, action: str, resource: str, resource_id: Optional[int] = None, details: Optional[Any] = None):
    return await AuditLog.create(
        user_id=user_id,
        action=action,
        resource=resource,
        resource_id=resource_id,
        details=details
    ) 