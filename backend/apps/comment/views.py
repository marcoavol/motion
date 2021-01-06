from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import ListCreateAPIView, ListAPIView
from apps.comment.models import Comment
from apps.comment.serializers import CommentSerializer


# I get all comments and send comment/
@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Get all comments'))
@method_decorator(name='post', decorator=swagger_auto_schema(operation_description='Send comment to post'))
class CommentsView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'post'
    lookup_url_kwarg = 'post_id'


# Get comment to specific post
@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Get comments to specific post'))
class CommentsSingleView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'post'
    lookup_url_kwarg = 'post_id'

    def get_queryset(self):
        post_id = self.kwargs.get('post_id')
        return Comment.objects.filter(post=post_id)
