from rest_framework import serializers
from .models import Comment
from django.contrib.auth import get_user_model
User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created']

# it shows user name
class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class CommentSimpleSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer()
    class Meta:
        model = Comment
        fields = ['user', 'content', 'created']
