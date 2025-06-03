from tortoise import fields, models
from tortoise.models import Model
from app.models.course import Course

class Cohort(Model):
    id = fields.IntField(pk=True)
    course = fields.ForeignKeyField('models.Course', related_name='cohorts')
    name = fields.CharField(max_length=255)
    start_date = fields.DateField(null=True)
    end_date = fields.DateField(null=True)
    status = fields.CharField(max_length=32, default="active")
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "Cohort" 