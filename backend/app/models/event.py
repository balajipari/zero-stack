from tortoise import fields, models
from tortoise.models import Model

class Event(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    start_time = fields.DatetimeField()
    end_time = fields.DatetimeField(null=True)
    location = fields.CharField(max_length=255, null=True)
    accessible_memberships = fields.JSONField(null=True)  # list of membership types
    payment_required = fields.BooleanField(default=False)
    status = fields.CharField(max_length=32, default="active")  # active, cancelled, etc.
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Event" 