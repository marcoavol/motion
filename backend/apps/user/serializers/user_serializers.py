from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = User.PUBLIC_FIELDS


class PrivateUserSerializer(serializers.ModelSerializer):
    # Prevent circular imports when PublicUserSerializer is used in other apps
    from apps.post.serializers import PostSerializer

    posts = PostSerializer(many=True, read_only=True)
    liked_posts = PostSerializer(many=True, read_only=True)
    followers = PublicUserSerializer(many=True, read_only=True)
    followees = PublicUserSerializer(many=True, read_only=True)
    friends = PublicUserSerializer(many=True, read_only=True)

    # TODO: Add hobbies and comments field once apps refactored
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'country', 'city', 'about', 'avatar', 'posts',
                  'liked_posts', 'followers', 'followees', 'friends']
