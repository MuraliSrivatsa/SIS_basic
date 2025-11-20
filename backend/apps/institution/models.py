from django.db import models
from apps.authentication.models import CustomUser


class Institution(models.Model):
    institutionName = models.CharField(max_length=255)
    institutionCode = models.CharField(max_length=100, unique=True, primary_key=True)
    institutionType = models.CharField(max_length=100, blank=True, null=True)
    establishedYear = models.IntegerField(blank=True, null=True)
    affiliationBoard = models.CharField(max_length=255, blank=True, null=True)
    registrationNumber = models.CharField(max_length=100, blank=True, null=True)

    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    postalCode = models.CharField(max_length=20, blank=True, null=True)

    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    # 👉 Link to users instead of plain text
    principal = models.OneToOneField(
        CustomUser,
        related_name="principal_institution",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    admin = models.OneToOneField(
        CustomUser,
        related_name="admin_institution",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    totalStudents = models.IntegerField(blank=True, null=True)
    totalTeachers = models.IntegerField(blank=True, null=True)
    totalClasses = models.IntegerField(blank=True, null=True)

    facilities = models.JSONField(default=list, blank=True, null=True)
    subjects = models.JSONField(default=list, blank=True, null=True)

    academicYear = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    institutionLogo = models.ImageField(
        upload_to="institutions/logos/", blank=True, null=True
    )

    def __str__(self):
        return f"{self.institutionName} ({self.institutionCode})"


class InstitutionDocument(models.Model):
    institution = models.ForeignKey(
        Institution, related_name="documents", on_delete=models.CASCADE
    )
    file = models.FileField(upload_to="institutions/documents/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.institution.institutionName} - {self.file.name}"
