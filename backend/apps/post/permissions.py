from rest_framework.permissions import BasePermission


# Check if current user is author of a post
class IsAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
