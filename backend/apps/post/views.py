from rest_framework import generics, response, status
from apps.post.models import Post
from apps.post.serializers import PostSerializer
from apps.post.permissions import IsAuthor
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema, no_body


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


@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Retrieve a post.'))
@method_decorator(name='put',
                  decorator=swagger_auto_schema(operation_description='Update a post of the logged-in user.'))
@method_decorator(name='patch',
                  decorator=swagger_auto_schema(operation_description='Partially update a post of the logged-in user.'))
class RetrieveUpdateDestroyPostView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post
    serializer_class = PostSerializer
    lookup_url_kwarg = 'post_id'
    permission_classes = [IsAuthor]


class ToggleLikeView(generics.GenericAPIView):
    """
    Toggle like/dislike of a post for logged-in user.
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_url_kwarg = 'post_id'

    @swagger_auto_schema(request_body=no_body)
    def post(self, request, *args, **kwargs):
        post = self.get_object()
        user = self.request.user
        if post.user == user:
            return response.Response(data={'detail': 'User is not allowed to like his/her own post.'},
                                     status=status.HTTP_403_FORBIDDEN)
        if user in post.liked_by.all():
            post.liked_by.remove(user)
        else:
            post.liked_by.add(user)
        return response.Response(data=self.get_serializer(post).data, status=status.HTTP_201_CREATED)


class ListLikedPostsView(generics.ListAPIView):
    """
    List all posts the logged-in user likes.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.liked_posts.order_by('-created')




class ListFolloweesPostsView(generics.ListAPIView):
    """
    List all posts from users the logged-in user is following.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        followers_id = self.request.user.followers.all().values_list('id', flat=True)
        posts = Post.objects.filter(user__in=followers_id).order_by('-created')
        return posts


class ListFriendsPostsView(generics.ListAPIView):
    """
    List all posts from users the logged-in user is friends with.
    """
    serializer_class = PostSerializer

    def get_queryset(self):
        followers_id = self.request.user.friends().all().values_list('id', flat=True)
        posts = Post.objects.filter(user__in=followers_id).order_by('-created')
        return posts


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


