from tortoise import fields, models
from tortoise.models import Model
from app.models.user import User
from app.models.event import Event

class EventRegistration(Model):
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField('models.User', related_name='event_registrations')
    event = fields.ForeignKeyField('models.Event', related_name='registrations')
    registered_at = fields.DatetimeField(auto_now_add=True)
    status = fields.CharField(max_length=32, default="registered")  # registered, cancelled, attended, etc.

    class Meta:
        table = "EventRegistration" 