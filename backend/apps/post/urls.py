from django.urls import path
from apps.post.views import *

urlpatterns = [
    path('', ListCreatePostsView.as_view()),
    path('<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('user/', ListCurrentUsersPostsView.as_view()),
    path('user/<int:user_id>/', ListUsersPostsView.as_view()),
    path('likes/', ListLikedPostsView.as_view()),
    path('toggle-like/<int:post_id>/', ToggleLikeView.as_view()),
    path('following/', ListFolloweesPostsView.as_view()),
    path('friends/', ListFriendsPostsView.as_view()),
]
