from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User
from app.models.course import Course
from app.models.cohort import Cohort

class CourseMembership(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='course_memberships')
    course = fields.ForeignKeyField('models.Course', related_name='course_memberships')
    cohort = fields.ForeignKeyField('models.Cohort', related_name='course_memberships', null=True)
    enrolled_at = fields.DatetimeField(auto_now_add=True)
    status = fields.CharField(max_length=32, default="active")  # active, completed, dropped, etc.

    class Meta:
        table = "CourseMembership" 