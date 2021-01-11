from apps.auth.serializers.registration_serializers import ValidationSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# TODO: Refactor and optimize password-reset handling

class PasswordResetValidationSerializer(ValidationSerializer):
    def validate(self, attrs):
        return attrs

    class Meta:
        model = User
        fields = ['email', 'code', 'password', 'password_repeat']
