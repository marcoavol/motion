from django.urls import path
from ..views.users_views import ListUsersView, RetrieveUserView, RetrieveUpdateCurrentUserView

urlpatterns = [
    path('', ListUsersView.as_view()),
    path('<int:user_id>/', RetrieveUserView.as_view()),
    path('me/', RetrieveUpdateCurrentUserView.as_view()),
]
