from tortoise import fields, models
from tortoise.models import Model

class Course(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    accessible_memberships = fields.JSONField(null=True)  # list of membership types
    status = fields.CharField(max_length=32, default="active")  # active, archived, etc.
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Course" 