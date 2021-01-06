from rest_framework import generics, response, status
from django.contrib.auth import get_user_model
from ..serializers import PublicUserSerializer, PrivateUserSerializer
from drf_yasg.utils import swagger_auto_schema, no_body

User = get_user_model()


class ListFollowersView(generics.ListAPIView):
    """
    List all followers of the logged-in user.
    """
    serializer_class = PublicUserSerializer

    def get_queryset(self):
        return self.request.user.followers.all()


class ListFolloweesView(generics.ListAPIView):
    """
    List all followees of the logged-in user.
    """
    serializer_class = PublicUserSerializer

    def get_queryset(self):
        return self.request.user.followees.all()


class ToggleFollowView(generics.GenericAPIView):
    """
     Toggle follow/unfollow a user.
     """
    queryset = User
    serializer_class = PrivateUserSerializer
    lookup_url_kwarg = 'user_id'

    @swagger_auto_schema(request_body=no_body)
    def post(self, request, *args, **kwargs):
        followee = self.get_object()
        if followee == request.user:
            return response.Response(data={'detail': 'Followee must be different user than the logged-in user.'},
                                     status=status.HTTP_403_FORBIDDEN)
        if followee in request.user.followees.all():
            request.user.followees.remove(followee)
        else:
            request.user.followees.add(followee)
        return response.Response(data=self.get_serializer(request.user).data, status=status.HTTP_201_CREATED)
