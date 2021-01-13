from rest_framework import generics, response
from .models import Post, PostImage
from .serializers import PostSerializer, LikeSerializer, PostPicSerializer

IMAGE_FILE_TYPES = ['png', 'jpg', 'jpeg']


class PostList(generics.ListCreateAPIView):
    """
    List Posts for all users / Create a post for logged in user
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

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
