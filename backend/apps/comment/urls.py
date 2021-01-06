from django.urls import path
from . import views
from .views import CommentsSingleView

urlpatterns = [
    path('', views.CommentsView.as_view()),
    path('<int:post_id>/', CommentsSingleView.as_view()),
]