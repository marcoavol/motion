"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Documentation configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Motion API",
        default_version='v1',
        description="Django Motion Assignment",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="learn@propulsionacademy.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False to restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,)  # Permissions for docs access
)

api_patterns = [
    # Documentation
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # Authentication
    path('auth/token/', include('apps.authentication.urls.token_urls')),
    path('auth/registration/', include('apps.authentication.urls.registration_urls')),
    path('auth/password-reset/', include('apps.authentication.urls.password_reset_urls')),

    # User
    path('users/', include('apps.user.urls.users_urls')),
    path('social/followers/', include('apps.user.urls.followers_urls')),
    path('social/friends/', include('apps.user.urls.friends_urls')),

    # Hobby
    path('hobbies/', include('apps.hobby.urls')),

    # Post
    path('social/posts/', include('apps.post.urls')),

    # Comment
    path('social/comments/', include('apps.comment.urls')),
]

urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/', include(api_patterns))
]

# Serving static files during development
# https://docs.djangoproject.com/en/3.1/howto/static-files/
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
