from rest_framework import serializers
from apps.post.models import Post, PostImage
from apps.user.serializers.user_serializers import PublicUserSerializer, NestedUserSerializer
from apps.comment.serializers import CommentSimpleSerializer


# TODO: Add shared and sharing fields where appropriate once implemented

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image']


class PostSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer(read_only=True)
    images = serializers.SerializerMethodField()
    liked_by = PublicUserSerializer(many=True, read_only=True)
    comments = CommentSimpleSerializer(many=True, read_only=True)

    def get_images(self, obj):
        # Add context to nested serializer to get full image url
        return [PostImageSerializer(post_image, context=self.context).data.get('image') for post_image in
                obj.images.all()]

    # TODO: Implement image upload on post creation as well
    # def create(self, validated_data):
    #     pass

    # Update post
    def update(self, instance, validated_data):
        # for attr, value in validated_data.items():
        #     setattr(instance, attr, value)
        # TODO: Check if super is works too
        super().update(self, instance, validated_data)

        # TODO: Remove previous images in post (instead of just adding)
        uploaded_images = self.context.get('request').FILES.getlist('images')
        if uploaded_images:
            for image in uploaded_images:
                post_image = PostImage.objects.create(
                    post=instance,
                    image=image,
                )
                post_image.save()
        instance.save()
        return instance

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
