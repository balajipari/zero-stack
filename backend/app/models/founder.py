from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User

class FounderProfile(Model):
    id = fields.IntField(pk=True)
    user = fields.OneToOneField('models.User', related_name='founder_profile')
    bio = fields.TextField(null=True)
    company = fields.CharField(max_length=255, null=True)
    website = fields.CharField(max_length=255, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "FounderProfile" 