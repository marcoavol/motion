from rest_framework.permissions import BasePermission


# Check if current user is involved in a friend request
class IsInvolved(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in [obj.requester, obj.receiver]
