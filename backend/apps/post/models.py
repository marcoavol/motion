from django.db import models
from django.conf import settings


class Post(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    content = models.CharField(max_length=150)
    created = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(to=settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)

    # images - ForeignKey field defined in PostImage model
    # comments - ManyToMany field defined in Comment model
    # TODO: shared
    # TODO: sharing

    def __str__(self):
        return f'Post {self.id} ({self.user})'


# Save images to user specific directory in media files
def user_images_directory(instance, filename):
    return f'{instance.post.user}/images/{filename}'


class PostImage(models.Model):
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=user_images_directory)

    def __str__(self):
        return f'Image {self.id} ({self.image.name})'
