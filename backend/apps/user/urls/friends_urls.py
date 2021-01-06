from django.urls import path
from ..views.friends_views import ListFriendsView, CreateFriendRequestView, ListFriendRequestsView, \
    RetrieveUpdateDestroyFriendRequestView

urlpatterns = [
    path('', ListFriendsView.as_view()),
    path('request/<int:user_id>/', CreateFriendRequestView.as_view()),
    path('requests/', ListFriendRequestsView.as_view()),
    path('requests/<int:friend_request_id>/', RetrieveUpdateDestroyFriendRequestView.as_view())
]
