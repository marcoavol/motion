from django.urls import path
from .views import ListHobbyView, ListAllHobbyViewFilterPath

urlpatterns = [
    path('', ListHobbyView.as_view()),
    path('all/', ListAllHobbyViewFilterPath.as_view()),
]
