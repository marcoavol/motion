from django.urls import path
from . import views

urlpatterns = [
    # path('', views.ListPostsView.as_view()),
    path('', views.PostList.as_view()),
    # path('api/', views.apiOverview, name="api-overview"),
    path('<int:pk>/', views.PostDetail.as_view()),
    path('toggle-like/<int:pk>/', views.LikePost.as_view()),
    path('user/', views.ListUsersPost.as_view()),
    path('user/<int:user_id>/', views.ListOtherUserPosts.as_view()),
    path('likes/', views.ListLikedPost.as_view()),
    path('pic/', views.PostPicView.as_view()),

    path('following/', views.MyFollowersPosts.as_view()),
    path('friends/', views.MyFriendsPosts.as_view()),
]
