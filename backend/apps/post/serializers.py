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
    liked_by = PublicUserSerializer(many=True, read_only=True)
    comments = CommentSimpleSerializer(many=True, read_only=True)

    def get_images(self, obj):
        # Add context to nested serializer to get full image url
        return [PostImageSerializer(post_image, context=self.context).data.get('image') for post_image in
                obj.images.all()]

    # Create post
    def create(self, validated_data):
        post = super().create(validated_data)

        uploaded_images = self.context.get('request').FILES.getlist('images')
        if uploaded_images:
            for image in uploaded_images:
                post_image = PostImage.objects.create(
                    post=post,
                    image=image,
                )
                post_image.save()

        return post

    # Update post
    def update(self, instance, validated_data):
        super().update(instance, validated_data)

        # If images parameter is present in request, delete all images related to this post
        # (ensures that post can be updated to contain no images anymore)
        if self.context.get('request').data.get('images') is not None:
            instance.images.all().delete()

        # If image files are present in request, create a PostImage instance for each image that is related to this post
        uploaded_images = self.context.get('request').FILES.getlistlkj('images')
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


class FolloweesSerilizer(serializers.ModelSerializer):
    # user = PrivateUserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
