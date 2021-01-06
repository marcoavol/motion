from django.db import models
from django.conf import settings


# Create your models here.
class Hobby(models.Model):
    user = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='hobby')
    hobby = models.CharField(max_length=150)

    def __str__(self):
        return f'Hobby {self.hobby}'
