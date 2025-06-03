from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User

class Content(Model):
    id = fields.IntField(pk=True)
    type = fields.CharField(max_length=32)  # blog, case_study, podcast
    title = fields.CharField(max_length=255)
    body = fields.TextField()
    tags = fields.JSONField(null=True)
    status = fields.CharField(max_length=32)  # draft, published, archived
    author = fields.ForeignKeyField('models.User', related_name='contents')
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Content" 