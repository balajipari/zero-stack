from tortoise import fields, models
from tortoise.models import Model

class Meetup(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    description = fields.TextField(null=True)
    date = fields.DatetimeField()
    location = fields.CharField(max_length=255, null=True)
    status = fields.CharField(max_length=32, default="active")  # active, cancelled, etc.
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Meetup" 