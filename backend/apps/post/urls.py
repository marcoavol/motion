from django.urls import path
from apps.post.views import *

urlpatterns = [
    path('', ListCreatePostsView.as_view()),
    path('<int:post_id>/', RetrieveUpdateDestroyPostView.as_view()),
    path('toggle-like/<int:post_id>/', ToggleLikeView.as_view()),

    path('user/', ListUsersPost.as_view()),
    path('user/<int:user_id>/', ListOtherUserPosts.as_view()),
    path('likes/', ListLikedPost.as_view()),
    path('pic/', PostPicView.as_view()),
    path('following/', MyFollowersPosts.as_view()),
    path('friends/', MyFriendsPosts.as_view()),
]
