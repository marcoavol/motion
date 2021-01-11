from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import TokenObtainPairView
from apps.auth.serializers.token_serializers import TokenObtainSerializer, TokenReturnSerializer


@method_decorator(name='post', decorator=swagger_auto_schema(responses={201: TokenReturnSerializer}))
class TokenObtainView(TokenObtainPairView):
    """
    Create a new session for a user and get back tokens and logged-in user.
    """
    serializer_class = TokenObtainSerializer
