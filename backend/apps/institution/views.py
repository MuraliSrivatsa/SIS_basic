from rest_framework import viewsets
from .models import Institution
from rest_framework.permissions import AllowAny
from .serializers import InstitutionSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)  # 👈 required
