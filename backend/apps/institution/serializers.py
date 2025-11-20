from rest_framework import serializers
from .models import Institution
from apps.authentication.models import CustomUser


class InstitutionSerializer(serializers.ModelSerializer):
    principalName = serializers.CharField(write_only=True)
    principalEmail = serializers.EmailField(write_only=True)
    principalPhone = serializers.CharField(write_only=True)

    adminName = serializers.CharField(write_only=True)
    adminEmail = serializers.EmailField(write_only=True)
    adminPhone = serializers.CharField(write_only=True)

    class Meta:
        model = Institution
        fields = "__all__"

    def create(self, validated_data):
        # Extract principal/admin info
        principal_name = validated_data.pop("principalName")
        principal_email = validated_data.pop("principalEmail")
        principal_phone = validated_data.pop("principalPhone")

        admin_name = validated_data.pop("adminName")
        admin_email = validated_data.pop("adminEmail")
        admin_phone = validated_data.pop("adminPhone")

        # Split names (basic way)
        principal_first, _, principal_last = principal_name.partition(" ")
        admin_first, _, admin_last = admin_name.partition(" ")

        # Create users
        principal_user = CustomUser.objects.create_user(
            username=principal_email,
            email=principal_email,
            password="default123",  # ⚡ you can set random / send activation link
            first_name=principal_first,
            last_name=principal_last,
            user_type="principal",
        )

        admin_user = CustomUser.objects.create_user(
            username=admin_email,
            email=admin_email,
            password="default123",
            first_name=admin_first,
            last_name=admin_last,
            user_type="admin",
        )

        # Create institution and link users
        institution = Institution.objects.create(
            principal=principal_user, admin=admin_user, **validated_data
        )

        return institution
