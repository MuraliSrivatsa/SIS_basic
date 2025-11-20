from django.db import models
from apps.authentication.models import CustomUser


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    student_id = models.CharField(max_length=20, unique=True)
    grade_level = models.IntegerField()
    date_of_birth = models.DateField()
    address = models.TextField()
    emergency_contact = models.CharField(max_length=15)
    enrollment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.student_id}"


class Parent(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    children = models.ManyToManyField(Student, related_name="parents")
    relationship = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} (Parent)"


class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField()
    credits = models.IntegerField()
    grade_level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.name}"


class Enrollment(models.Model):
    student = models.ForeignKey(
        Student, related_name="enrollments", on_delete=models.CASCADE
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    semester = models.CharField(max_length=20)
    year = models.IntegerField()
    enrolled_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["student", "course", "semester", "year"]


class Grade(models.Model):
    enrollment = models.ForeignKey(
        Enrollment, related_name="grades", on_delete=models.CASCADE
    )
    assignment_name = models.CharField(max_length=100)
    score = models.DecimalField(max_digits=5, decimal_places=2)
    max_score = models.DecimalField(max_digits=5, decimal_places=2)
    date_recorded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enrollment.student.user.username} - {self.assignment_name}: {self.score}/{self.max_score}"


class AttendanceRecord(models.Model):
    ATTENDANCE_CHOICES = [
        ("present", "Present"),
        ("absent", "Absent"),
        ("late", "Late"),
        ("excused", "Excused"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=ATTENDANCE_CHOICES)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ["student", "course", "date"]
