from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models.friends_models import FriendRequest

User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    readonly_fields = ['last_login', 'date_joined']

    # fields shown when creating a new instance
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['email', 'username', 'first_name', 'last_name', 'password1', 'password2'],
        })
    ]

    # fields shown when reading / updating an instance
    # TODO: Add hobbies to profile fields once implemented
    fieldsets = [
        ('Authentication', {'fields': ['email', 'password']}),
        ('Profile', {'fields': ['username', 'first_name', 'last_name', 'country', 'city', 'about', 'avatar']}),
        ('Dates', {'fields': ['last_login', 'date_joined']}),
        ('Permissions', {'fields': ['is_active', 'is_staff', 'is_superuser', 'user_permissions']}),
    ]

    # fields shown when looking at a list of instances
    list_display = ['email', 'username', 'first_name', 'last_name']
    list_filter = ['email', 'username', 'last_name', 'is_active', 'is_staff', 'is_superuser']

    ordering = ['email']


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    # fields shown when creating a new instance
    add_fieldsets = [
        (None, {
            'classes': ['wide'],
            'fields': ['requester', 'receiver', 'status'],
        })
    ]

    # fields shown when looking at a list of instances
    list_display = ['requester', 'receiver', 'status']
    list_filter = ['requester', 'receiver', 'status']

    ordering = ['requester']
