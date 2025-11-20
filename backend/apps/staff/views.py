from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Staff
from .serializers import StaffSerializer
import base64
from django.core.files.base import ContentFile

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def staff_profile(request):
    # Ensure user is staff
    if request.user.user_type != 'staff':
        return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        staff = Staff.objects.get(user=request.user)
    except Staff.DoesNotExist:
        return Response({"error": "Staff profile not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StaffSerializer(staff, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Handle base64 photo
        user_data = request.data.get('user', {})
        if 'profile_picture' in user_data and user_data['profile_picture'].startswith('data:image'):
            format, imgstr = user_data['profile_picture'].split(';base64,')
            ext = format.split('/')[-1]
            user_data['profile_picture'] = ContentFile(base64.b64decode(imgstr), name=f'profile_{request.user.username}.{ext}')
        request.data['user'] = user_data

        serializer = StaffSerializer(staff, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)