from django.urls import path
from . import views


urlpatterns = [
    #path('', views.ListPostsView.as_view()),
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
"""
Posts

     DONE POST: user can create a new post by sending post data. 
     DONE He should also be able to share another post. 
       (Check out the frontend design to see how a shared post looks like frontend design)

     DONE GET: lists all the posts of all users 
     TODO in chronological order 
     

    TODO ?search=<str:search_string> GET: Search posts of all users and list result in chronological order

    DONE <int:post_id>/ GET: get a specific post by ID and display all the information about that post

    DONE <int:post_id>/ PATCH: update a specific post 
    TODO (only allow owner of post or admin)

    DONE <int:post_id>/ DELETE: delete a post by ID 
    TODO (only allow owner of post or admin)

    DONE user/<int:user_id>/ GET: lists all the posts of a specific user 
    TODO in chronological order

    TODO following/ GET: lists all the posts of followed users in chronological order

    TODO friends/ GET: lists all the posts of the logged in user’s friends in chronological order

    DONE toggle-like/int:post_id>/ POST: Toggle like a post

    DONE likes/ GET: the list of the posts the user likes
    
"""