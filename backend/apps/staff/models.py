from django.db import models
from django.conf import settings

from apps.authentication.models import CustomUser
from apps.institution.models import Institution


# Assuming you already have CustomUser and Institution models
class Staff(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    staff_id = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    qualification = models.CharField(max_length=150, blank=True, null=True)
    subject_specialization = models.CharField(max_length=150, blank=True, null=True)
    date_joined = models.DateField(auto_now_add=True)
    employment_type = models.CharField(
        max_length=50,
        choices=[
            ("full_time", "Full Time"),
            ("part_time", "Part Time"),
            ("contract", "Contract"),
            ("visiting", "Visiting"),
        ],
        default="full_time",
    )
    address = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.staff_id})"

    def delete(self, *args, **kwargs):
        # delete linked user first
        if self.user:
            self.user.delete()
        super().delete(*args, **kwargs)