from rest_framework_simplejwt.views import TokenObtainPairView
from apps.auth.serializers.token_serializers import TokenObtainSerializer, TokenObtainResponseSerializer
from rest_framework import status
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema


@method_decorator(name='post',
                  decorator=swagger_auto_schema(responses={status.HTTP_201_CREATED: TokenObtainResponseSerializer}))
class TokenObtainView(TokenObtainPairView):
    """
    Create a new session for a user and get back tokens and logged-in user.
    """
    serializer_class = TokenObtainSerializer
