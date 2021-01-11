from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView
from django.contrib.auth import get_user_model
from apps.user.serializers import PublicUserSerializer, PrivateUserSerializer
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema

User = get_user_model()


class ListUsersView(ListAPIView):
    """
    List all users. Filter with (chainable) query parameters of pattern \\<attribute>__<lookup_name>=\\<value>.
    """
    serializer_class = PublicUserSerializer

    # Allows dynamic filtering for all public fields with multiple query parameters supporting lookups
    def get_queryset(self):
        queryset = User.objects.all()
        queryparams = self.request.query_params
        for key in queryparams.keys():
            attr = key.split('__')[0]
            if hasattr(User, attr) and attr in User.PUBLIC_FIELDS:
                query = {f'{key}': queryparams.get(key)}
                queryset = queryset.filter(**query)
            else:
                return []
        return queryset


@method_decorator(name='get', decorator=swagger_auto_schema(responses={200: PublicUserSerializer}))
class RetrieveUserView(RetrieveAPIView):
    """
    Retrieve a user.
    """
    queryset = User
    lookup_url_kwarg = 'user_id'

    # TODO: Somehow implement friend-check as reusable permission/mixin
    # If retrieved user is logged-in user or one of his/her friends display private information as well
    def get_serializer_class(self):
        current_user = self.request.user
        obj = self.get_object()
        if current_user == obj or current_user in obj.friends():
            return PrivateUserSerializer
        return PublicUserSerializer


@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Retrieve the logged-in user.'))
@method_decorator(name='put', decorator=swagger_auto_schema(operation_description='Update the logged-in user.'))
@method_decorator(name='patch',
                  decorator=swagger_auto_schema(operation_description='Partially update the logged-in user.'))
class RetrieveUpdateCurrentUserView(RetrieveUpdateAPIView):
    serializer_class = PrivateUserSerializer

    def get_object(self):
        return User.objects.get(id=self.request.user.id)
