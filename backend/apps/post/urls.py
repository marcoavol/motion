from django.urls import path
from apps.post import views

urlpatterns = [
    path('', views.ListCreatePostsView.as_view()),
    path('<int:post_id>/', views.RetrieveUpdateDestroyPostView.as_view()),
    path('user/', views.ListCurrentUsersPostsView.as_view()),
    path('user/<int:user_id>/', views.ListUsersPostsView.as_view()),
    path('likes/', views.ListLikedPostsView.as_view()),
    path('toggle-like/<int:post_id>/', views.ToggleLikeView.as_view()),
    path('following/', views.ListFolloweesPostsView.as_view()),
    path('friends/', views.ListFriendsPostsView.as_view()),
]
