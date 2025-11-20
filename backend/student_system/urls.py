from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from apps.students.views import StudentViewSet
from apps.students.views import CourseViewSet
from apps.institution.views import InstitutionViewSet


router = DefaultRouter()
router.register(r"students", StudentViewSet)
router.register(r"courses", CourseViewSet)
router.register(r"institutions", InstitutionViewSet)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("apps.authentication.urls")),
    path("api/", include("apps.students.urls")),
    path("api/staff/", include("apps.staff.urls")),
    path("api/", include("apps.api.urls")),
    path("api/", include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
