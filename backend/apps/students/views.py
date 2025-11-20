from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Count
from .models import Student, Course, Grade, Enrollment, AttendanceRecord
from .serializers import StudentSerializer, CourseSerializer, GradeSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == "student":
            return Student.objects.filter(user=user)
        elif user.user_type == "parent":
            return user.parent.children.all()
        return Student.objects.all()

    @action(detail=True, methods=["get"])
    def dashboard(self, request, pk=None):
        student = self.get_object()
        ai_engine = AIRecommendationEngine()

        # Get recent grades
        recent_grades = Grade.objects.filter(enrollment__student=student).order_by(
            "-date_recorded"
        )[:10]

        # Get performance predictions
        predictions = []
        for enrollment in student.enrollment_set.all():
            pred, conf = ai_engine.predict_performance(student, enrollment.course)
            predictions.append(
                {
                    "course": enrollment.course.name,
                    "predicted_grade": pred,
                    "confidence": conf,
                }
            )

        # Get recommendations
        course_recommendations = ai_engine.generate_course_recommendations(student)

        return Response(
            {
                "student_info": StudentSerializer(student).data,
                "recent_grades": GradeSerializer(recent_grades, many=True).data,
                "performance_predictions": predictions,
                "course_recommendations": [
                    {
                        "course_name": rec["course"].name,
                        "reason": rec["reason"],
                        "confidence": rec["score"],
                    }
                    for rec in course_recommendations
                ],
            }
        )

    @action(detail=True, methods=["get"])
    def performance_analytics(self, request, pk=None):
        student = self.get_object()

        # Calculate performance metrics
        grades = Grade.objects.filter(enrollment__student=student)
        avg_grade = grades.aggregate(Avg("score"))["score__avg"] or 0

        # Grade distribution
        grade_distribution = {
            "A": grades.filter(score__gte=90).count(),
            "B": grades.filter(score__gte=80, score__lt=90).count(),
            "C": grades.filter(score__gte=70, score__lt=80).count(),
            "D": grades.filter(score__gte=60, score__lt=70).count(),
            "F": grades.filter(score__lt=60).count(),
        }

        # Attendance rate
        attendance = AttendanceRecord.objects.filter(student=student)
        attendance_rate = 0
        if attendance.exists():
            present_count = attendance.filter(status="present").count()
            attendance_rate = (present_count / attendance.count()) * 100

        return Response(
            {
                "average_grade": avg_grade,
                "total_assignments": grades.count(),
                "grade_distribution": grade_distribution,
                "attendance_rate": attendance_rate,
                "performance_trend": self.calculate_performance_trend(grades),
            }
        )

    def calculate_performance_trend(self, grades):
        """Calculate performance trend over time"""
        from django.utils import timezone
        from datetime import timedelta

        # Get grades from last 5 months
        monthly_averages = []
        for i in range(5):
            start_date = timezone.now().date() - timedelta(days=30 * (i + 1))
            end_date = timezone.now().date() - timedelta(days=30 * i)

            month_grades = grades.filter(
                date_recorded__date__gte=start_date, date_recorded__date__lt=end_date
            )

            if month_grades.exists():
                avg = month_grades.aggregate(Avg("score"))["score__avg"]
                monthly_averages.append(
                    {"month": start_date.strftime("%B"), "average": round(avg, 2)}
                )

        return list(reversed(monthly_averages))

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        student = get_object_or_404(Student, user=request.user)
        serializer = self.get_serializer(student)
        return Response(serializer.data)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == "student":
            # Return courses the student is enrolled in
            student = Student.objects.get(user=user)
            return Course.objects.filter(enrollment__student=student)
        return Course.objects.all()
