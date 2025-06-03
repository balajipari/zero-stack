from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User

class AuditLog(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='audit_logs')
    action = fields.CharField(max_length=64)
    resource = fields.CharField(max_length=64)
    resource_id = fields.IntField(null=True)
    details = fields.JSONField(null=True)
    timestamp = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "AuditLog" 