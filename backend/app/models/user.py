from tortoise import fields, models
from tortoise.models import Model

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=255, unique=True)
    role = fields.CharField(max_length=20)
    profile = fields.TextField(null=True)
    verification_status = fields.BooleanField(default=False)
    password_hash = fields.CharField(max_length=128)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "User"
