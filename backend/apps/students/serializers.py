from rest_framework import serializers
from .models import Student, Course, Grade, Enrollment, AttendanceRecord
from apps.authentication.serializers import UserSerializer


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "code", "description", "credits", "grade_level"]


class GradeSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="enrollment.course.name", read_only=True)
    course_code = serializers.CharField(source="enrollment.course.code", read_only=True)

    class Meta:
        model = Grade
        fields = [
            "id",
            "assignment_name",
            "score",
            "max_score",
            "date_recorded",
            "course_name",
            "course_code",
        ]


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ["id", "course", "semester", "year", "enrolled_date"]


class AttendanceSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source="course.name", read_only=True)

    class Meta:
        model = AttendanceRecord
        fields = ["id", "date", "status", "notes", "course_name"]


class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    enrollments = EnrollmentSerializer(many=True, read_only=True)
    grades = GradeSerializer(
        source="enrollments__grades", many=True, read_only=True
    )  # if nested
    attendance_records = AttendanceSerializer(many=True, read_only=True)

    class Meta:
        model = Student
        fields = [
            "id",
            "user",
            "student_id",
            "grade_level",
            "date_of_birth",
            "address",
            "emergency_contact",
            "enrollment_date",
            "enrollments",
            "grades",
            "attendance_records",
        ]
