from tortoise import fields, models
from tortoise.models import Model
from app.models.meetup import Meetup

class MeetupPhoto(Model):
    id = fields.IntField(pk=True)
    meetup = fields.ForeignKeyField('models.Meetup', related_name='photos')
    file_path = fields.CharField(max_length=512)
    uploaded_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "MeetupPhoto" 