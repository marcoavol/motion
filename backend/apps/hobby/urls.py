from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListHobbyView.as_view()),
    path('all/', views.ListAllHobbyViewFilterPath.as_view()),
]