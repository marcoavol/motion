from django.db import models
from django.conf import settings
from apps.post.models import Post


# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comment', null=True)
    post = models.ForeignKey(to=Post, on_delete=models.SET_NULL, related_name='comments', null=True)
    content = models.CharField(max_length=150)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by: {self.user} to post {self.post}'
