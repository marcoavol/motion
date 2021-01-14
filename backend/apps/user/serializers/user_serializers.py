from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        ref_name = None  # Prevents yasg docs from displaying 'NestedUser' as model name for nested user fields


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = User.PUBLIC_FIELDS


class PrivateUserSerializer(serializers.ModelSerializer):
    followers = PublicUserSerializer(many=True, read_only=True)
    followees = PublicUserSerializer(many=True, read_only=True)
    friends = PublicUserSerializer(many=True, read_only=True)

    # TODO: Add hobbies (and posts, liked_posts, comments?) field once implemented on each of the models
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'country', 'city', 'about', 'avatar',
                  'followers', 'followees', 'friends']



