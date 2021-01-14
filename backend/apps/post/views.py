from rest_framework import generics, response
from apps.post.models import Post, PostImage
from apps.post.serializers import PostSerializer, LikeSerializer, PostPicSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='List all posts.'))
@method_decorator(name='post',
                  decorator=swagger_auto_schema(operation_description='Create a new post for the logged-in user.'))
class ListCreatePostsView(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    # Allows dynamic filtering for specified fields with multiple query parameters supporting django field lookups
    def get_queryset(self):
        queryset = Post.objects.all()
        queryparams = self.request.query_params
        for key in queryparams.keys():
            attr = key.split('__')[0]
            if hasattr(Post, attr) and attr in ['id', 'user', 'content', 'created']:
                query = {f'{key}': queryparams.get(key)}
                queryset = queryset.filter(**query)
            else:
                return []
        return queryset.order_by('-created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Show / Update / Delete one Post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class ListUsersPost(generics.ListAPIView):
    """
    Show Posts of logged in User
    """
    # TODO order seems not to work
    ordering = ['created']
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user)


class ListOtherUserPosts(generics.ListAPIView):
    """
    Show Posts of logged in User
    """
    # TODO order seems not to work
    ordering = ['created']
    serializer_class = PostSerializer

    def get_queryset(self):
        id = self.kwargs.get('user_id')
        return Post.objects.filter(user=id)


class LikePost(generics.UpdateAPIView):
    """
    Like / Unlike  a Post
    """
    # I am trying to prevent the user to like himself
    # this works but I believe it is a validation and belongs to the
    # serializer
    # permission_classes = [IsNotPostUser]

    queryset = Post.objects.all()
    serializer_class = LikeSerializer

    def perform_update(self, serializer):
        post = self.get_object()
        user = self.request.user
        # TODO check if the post was liked by this user already
        user_liked_post = user in post.liked_by.all()
        if user_liked_post:
            post.liked_by.remove(user)
        else:
            post.liked_by.add(user)
        return response.Response(self.get_serializer(post).data)


class ListLikedPost(generics.ListAPIView):
    """
    Show Posts the User liked
    """
    # TODO order seems not to work
    ordering = ['created']
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(liked_by=user)


class PostPicView(generics.ListCreateAPIView):
    """
    List / Add a Picture to a Post
    """
    queryset = PostImage.objects.all()
    serializer_class = PostPicSerializer


class MyFollowersPosts(generics.ListAPIView):
    """
    Get posts from all followers
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        followers_id = self.request.user.followers.all().values_list('id', flat=True)
        posts = Post.objects.filter(user__in=followers_id).order_by('-created')
        return posts


class MyFriendsPosts(generics.ListAPIView):
    """
    Get posts from all friends
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        followers_id = self.request.user.friends().all().values_list('id', flat=True)
        posts = Post.objects.filter(user__in=followers_id).order_by('-created')
        return posts
