from apps.authentication.models import CustomUser
from apps.students.models import Student

# Create demo users
student_user = CustomUser.objects.create_user(
    username="student1",
    password="password123",
    first_name="John",
    last_name="Doe",
    email="john.doe@email.com",
    user_type="student",
)
teacher_user = CustomUser.objects.create_user(
    username="teacher1",
    password="password123",
    first_name="Jane",
    last_name="Smith",
    email="jane.smith@email.com",
    user_type="staff",
)

# --- Principal ---
principal_user = CustomUser.objects.create_user(
    username="principal1",
    password="password123",
    first_name="Albert",
    last_name="Einstein",
    email="principal@email.com",
    user_type="principal",  # 👈 Make sure 'principal' exists in choices
)

# --- Admin ---
admin_user = CustomUser.objects.create_user(
    username="admin1",
    password="password123",
    first_name="Ada",
    last_name="Lovelace",
    email="admin@email.com",
    user_type="admin",  # 👈 Typically "admin" or "superuser"
)

# --- Parent ---
parent_user = CustomUser.objects.create_user(
    username="parent1",
    password="password123",
    first_name="Michael",
    last_name="Johnson",
    email="parent@email.com",
    user_type="parent",  # 👈 Parent type
)

# Create student profile
Student.objects.create(
    user=student_user,
    student_id="STU001",
    grade_level=10,
    date_of_birth="2008-05-15",
    address="123 Main St",
    emergency_contact="555-0123",
)


# Example of linking parent to a student (if your model supports it)
# Assuming your Student model has a ForeignKey or ManyToMany for parent
student = Student.objects.get(student_id="STU001")  # existing student
student.parent = parent_user
student.save()
