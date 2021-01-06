from django.db import models
from django.conf import settings


class Post(models.Model):
    user = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    content = models.CharField(
        max_length=150,
        blank=False
    )
    created = models.DateTimeField(
        auto_now=True
    )
    liked_by = models.ManyToManyField(
        to=settings.AUTH_USER_MODEL,
        related_name='liked_posts',
        blank=True
    )

    # comments = Set('Comment')
    # shared = Optional('Post', reverse='sharing')
    # sharing = Set('Post', reverse='shared')

    def __str__(self):
        return f'ID: {self.pk}: {self.content} '


class Post_Pic(models.Model):
    created = models.DateTimeField(
        auto_now=True
    )
    post_id = models.ForeignKey(
        to=Post,
        on_delete=models.CASCADE,
        related_name='posts',
    )
    image = models.ImageField(
        upload_to='post_pic'
    )

    def __str__(self):
        return f'ID: {self.pk} Post: {self.post_id} File: {self.image.name}'
