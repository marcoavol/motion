from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters
from rest_framework.generics import ListAPIView, ListCreateAPIView

from apps.hobby.models import Hobby
from apps.hobby.serializers import HobbySerializer


@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Get all hobbys'))
class ListAllHobbyViewFilterPath(ListCreateAPIView):
    """
    get:
    GET all hobbies

    post:
    POST new hobby to hobbies, user is required

    """
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer


class UserFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        return queryset.filter(user=request.user)

@method_decorator(name='get', decorator=swagger_auto_schema(operation_description='Filtering by log in user'))
class ListHobbyView(ListAPIView):
    """
    filtering by log in user
    """
    queryset = Hobby.objects.all()
    serializer_class = HobbySerializer
    filter_backends = [UserFilterBackend]