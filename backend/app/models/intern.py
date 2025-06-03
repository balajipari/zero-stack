from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User

class InternProfile(Model):
    id = fields.IntField(pk=True)
    user = fields.OneToOneField('models.User', related_name='intern_profile')
    bio = fields.TextField(null=True)
    skills = fields.JSONField(null=True)
    is_star = fields.BooleanField(default=False)
    is_listed = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "InternProfile" 