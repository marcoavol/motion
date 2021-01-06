from django.urls import path
from ..views.followers_views import ListFollowersView, ListFolloweesView, ToggleFollowView


urlpatterns = [
    path('followers/', ListFollowersView.as_view()),
    path('followees/', ListFolloweesView.as_view()),
    path('toggle-follow/<int:user_id>/', ToggleFollowView.as_view())
]