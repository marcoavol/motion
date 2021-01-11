from django.urls import path
from apps.auth.views.registration_views import RegistrationView, ValidationView

urlpatterns = [
    path('', RegistrationView.as_view()),
    path('validation/', ValidationView.as_view()),
]
