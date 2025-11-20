from django.contrib import admin
from .models import Student, Course, Grade, Enrollment, AttendanceRecord, Parent


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["student_id", "user", "grade_level", "enrollment_date"]
    list_filter = ["grade_level", "enrollment_date"]
    search_fields = ["student_id", "user__first_name", "user__last_name"]


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ["code", "name", "grade_level", "credits"]
    list_filter = ["grade_level"]
    search_fields = ["code", "name"]


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = [
        "enrollment",
        "assignment_name",
        "score",
        "max_score",
        "date_recorded",
    ]
    list_filter = ["date_recorded", "enrollment__course"]
    search_fields = ["assignment_name", "enrollment__student__user__username"]


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ["student", "course", "semester", "year"]
    list_filter = ["semester", "year", "course"]


@admin.register(AttendanceRecord)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ["student", "course", "date", "status"]
    list_filter = ["status", "date", "course"]


@admin.register(Parent)
class ParentAdmin(admin.ModelAdmin):
    list_display = ["user", "relationship"]
    filter_horizontal = ["children"]
