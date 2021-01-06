from rest_framework import generics, response, status
from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from ..serializers import PasswordResetValidationSerializer
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema

User = get_user_model()


# TODO: Refactor and optimize password-reset handling

class PasswordResetView(generics.GenericAPIView):
    """
    Send the user an email with a password reset code.
    """
    permission_classes = [AllowAny]

    def get_object(self):
        return generics.get_object_or_404(User.objects.all(), email=self.request.data.get('email'))

    @swagger_auto_schema(responses={204: "No Content"})
    def post(self, request, *args, **kwargs):
        user = self.get_object()
        user.registration_profile.update_code()
        send_mail(
            'Password reset',
            f'Here is your password reset code: {user.registration_profile.code}',
            None,
            [user.email],
            fail_silently=False,
        )
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class PasswordResetValidationView(generics.GenericAPIView):
    """
    Update the user with the reset password.
    """
    serializer_class = PasswordResetValidationSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return generics.get_object_or_404(User.objects.all(), email=self.request.data.get('email'))

    @swagger_auto_schema(responses={204: "No Content"})
    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_object(), data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.get_object().registration_profile.update_code()
        return response.Response(status=status.HTTP_204_NO_CONTENT)
