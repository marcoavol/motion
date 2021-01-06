from rest_framework import serializers
from .models import Hobby
from django.contrib.auth import get_user_model
User = get_user_model()


class HobbySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hobby
        fields ='__all__'
