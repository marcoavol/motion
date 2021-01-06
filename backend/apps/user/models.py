from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.friend_request.models import FriendRequest


# Save avatar to user specific directory in media files
def user_avatar_directory(instance, filename):
    return f'{instance.username}/avatar/{filename}'


class User(AbstractUser):
    # Field that is used as the unique identifier
    USERNAME_FIELD = 'email'

    # Fields that are required when using createsuperuser (username_field and password fields are required by default)
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    # Fields that shall be treated as public and can be exposed to all logged-in users
    PUBLIC_FIELDS = ('id', 'username', 'first_name', 'last_name', 'country')

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    country = models.CharField(max_length=150, blank=True, null=True)
    city = models.CharField(max_length=150, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to=user_avatar_directory, blank=True, null=True)
    followers = models.ManyToManyField(to='self', symmetrical=False, related_name='followees', blank=True)

    # registration_profile - ForeignKey field defined in RegistrationProfile model
    # hobbies = ManyToMany field defined in Hobby model
    # posts - ForeignKey field defined in Post model
    # liked_posts - ManyToMany field defined in Post model
    # comments - ForeignKey field defined in Comment model
    # requested = ForeignKey field defined in FriendRequest model
    # received = ForeignKey field defined in FriendRequest model


    def friends(self):
        requested = [request['receiver_id'] for request in
                     self.requested.filter(status=FriendRequest.ACCEPTED_STATUS).values()]
        received = [request['requester_id'] for request in
                    self.received.filter(status=FriendRequest.ACCEPTED_STATUS).values()]
        return User.objects.filter(id__in=requested + received)

    def __str__(self):
        return self.username
