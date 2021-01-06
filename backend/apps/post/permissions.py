from rest_framework import permissions


class IsNotPostUser(permissions.BasePermission):
    """
    Custom permission to only allow other users to like a post
    """

    def has_object_permission(self, request, view, obj):
        # Like permission is only allowed to another user
        return obj.user != request.user