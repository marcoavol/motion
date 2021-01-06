from rest_framework import generics
from django.contrib.auth import get_user_model
from ..serializers import PrivateUserSerializer
from apps.friend_request.models import FriendRequest
from apps.friend_request.serializers import FriendRequestSerializer
from ..permissions import IsInvolved
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema, no_body

User = get_user_model()


class ListFriendsView(generics.ListAPIView):
    """
    List all friends of the logged-in user.
    """
    serializer_class = PrivateUserSerializer

    def get_queryset(self):
        return self.request.user.friends()


@method_decorator(name='post', decorator=swagger_auto_schema(request_body=no_body))
class CreateFriendRequestView(generics.CreateAPIView):
    """
    Create a new pending friend request.
    """
    queryset = FriendRequest
    serializer_class = FriendRequestSerializer
    lookup_url_kwarg = 'user_id'

    # Set requester to logged-in user and receiver to user with user_id passed as URL path parameter
    def perform_create(self, serializer):
        requester = self.request.user
        receiver = generics.get_object_or_404(User.objects.all(), id=self.kwargs.get('user_id'))
        serializer.save(requester=requester, receiver=receiver, status=0)


class ListFriendRequestsView(generics.ListAPIView):
    """
    List all friend requests the logged-in user is involved.
    """
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return self.request.user.requested.all() | self.request.user.received.all()


@method_decorator(name='get', decorator=swagger_auto_schema(
    operation_description='Retrieve a friend request the logged-in user is involved.'))
@method_decorator(name='put',
                  decorator=swagger_auto_schema(
                      operation_description='Update a friend request the logged-in user is involved.'))
@method_decorator(name='patch',
                  decorator=swagger_auto_schema(
                      operation_description='Partially update a friend request the logged-in user is involved.'))
@method_decorator(name='delete', decorator=swagger_auto_schema(
    operation_description='Delete a friend request the logged-in user is involved.'))
class RetrieveUpdateDestroyFriendRequestView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FriendRequest
    serializer_class = FriendRequestSerializer
    lookup_url_kwarg = 'friend_request_id'
    permission_classes = [IsInvolved]

