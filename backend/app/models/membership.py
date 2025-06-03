from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User

class Membership(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='memberships')
    type = fields.CharField(max_length=32)  # e.g., Foundational, Growth
    status = fields.CharField(max_length=32)  # e.g., active, expired, cancelled
    start_date = fields.DateField()
    end_date = fields.DateField(null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Membership" 