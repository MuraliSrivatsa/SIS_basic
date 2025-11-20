from rest_framework import serializers
from .models import Staff
from apps.authentication.serializers import UserSerializer

class StaffSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested user data

    class Meta:
        model = Staff
        fields = '__all__'  # Or specify: ['id', 'user', 'address', 'department', 'position', 'experience', 'education', 'specialization', 'biography']

    def update(self, instance, validated_data):
        # Handle nested user update
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            if user_serializer.is_valid(raise_exception=True):
                user_serializer.save()
        return super().update(instance, validated_data)