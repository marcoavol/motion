from django.contrib import admin
from .models import FriendRequest


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


