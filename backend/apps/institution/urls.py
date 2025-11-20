from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InstitutionViewSet

router = DefaultRouter()
router.register(r"institutions", InstitutionViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
