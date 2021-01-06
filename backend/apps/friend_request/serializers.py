from rest_framework import serializers
from .models import FriendRequest
from apps.user.serializers import NestedUserSerializer
from django.db.models import Q


class FriendRequestSerializer(serializers.ModelSerializer):
    requester = NestedUserSerializer(read_only=True)
    receiver = NestedUserSerializer(read_only=True)

    # Makes sure receiver and requester are different users and record for these users doesn't already exist
    def validate(self, attrs):
        requester_id = self.context.get('request').user.id
        receiver_id = self.context.get('view').kwargs.get('user_id')
        if requester_id == receiver_id:
            raise serializers.ValidationError({'receiver': 'The receiver must not be the logged-in user.'})
        if FriendRequest.objects.filter(
                Q(requester=requester_id, receiver=receiver_id) | Q(requester=receiver_id, receiver=requester_id)):
            raise serializers.ValidationError(
                {'receiver': 'A friend request between the logged-in user and the given receiver already exists.'})
        return attrs

    class Meta:
        model = FriendRequest
        fields = ['id', 'requester', 'receiver', 'status', 'created']
