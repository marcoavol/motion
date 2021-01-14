from rest_framework import serializers
from apps.post.models import Post, PostImage
from apps.user.serializers.user_serializers import PublicUserSerializer
from apps.comment.serializers import CommentSimpleSerializer


# TODO: Add shared and sharing fields where appropriate once implemented

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']


class PostSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(read_only=True)
    images = serializers.SerializerMethodField()
    comments = CommentSimpleSerializer(many=True, read_only=True)

    def get_images(self, obj):
        return [PostImageSerializer(post_image, context=self.context).data.get('image') for post_image in
                obj.images.all()]

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'images', 'created', 'liked_by', 'comments']


class LikeSerializer(serializers.ModelSerializer):
    def validate_user(self, value):
        user = self.context.get('request').user.id
        if 'liked_by' == user:
            raise serializers.ValidationError(
                'You can not like your own posts!')

    class Meta:
        model = Post
        fields = '__all__'


class PostPicSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = '__all__'


class FolloweesSerilizer(serializers.ModelSerializer):
    # user = PrivateUserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
