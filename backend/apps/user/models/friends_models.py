from django.db import models
from django.conf import settings


class FriendRequest(models.Model):
    PENDING_STATUS = 0
    ACCEPTED_STATUS = 1
    REJECTED_STATUS = 2
    STATUS_CHOICES = [
        (PENDING_STATUS, 'pending'),
        (ACCEPTED_STATUS, 'accepted'),
        (REJECTED_STATUS, 'rejected'),
    ]
    status = models.IntegerField(choices=STATUS_CHOICES, default=PENDING_STATUS)
    requester = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='requested', on_delete=models.CASCADE)
    receiver = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='received', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Friend request {self.id} ({self.requester} - {self.receiver})'
