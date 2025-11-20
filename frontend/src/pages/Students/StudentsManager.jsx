import { useState } from "react";

export function StudentsManager() {
  const [students, setStudents] = useState([
    {
      id: "1",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@university.edu",
      studentId: "STU001",
      enrollmentDate: "2023-09-01",
      status: "active",
      gpa: 3.75
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@university.edu",
      studentId: "STU002",
      enrollmentDate: "2023-09-01",
      status: "active",
      gpa: 3.92
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@university.edu",
      studentId: "STU003",
      enrollmentDate: "2022-09-01",
      status: "graduated",
      gpa: 3.58
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@university.edu",
      studentId: "STU004",
      enrollmentDate: "2023-01-15",
      status: "active",
      gpa: 3.84
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    enrollmentDate: "",
    status: "active"
  });

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName} ${student.email} ${student.studentId}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      studentId: "",
      enrollmentDate: "",
      status: "active"
    });
    setIsDialogOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentId: student.studentId,
      enrollmentDate: student.enrollmentDate,
      status: student.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      setStudents(students.map(student =>
        student.id === editingStudent.id
          ? { ...student, ...formData }
          : student
      ));
      alert("Student updated successfully");
    } else {
      const newStudent = {
        id: Date.now().toString(),
        ...formData,
        gpa: 0
      };
      setStudents([...students, newStudent]);
      alert("Student added successfully");
    }

    setIsDialogOpen(false);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    alert("Student deleted successfully");
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "active":
        return { color: "green" };
      case "inactive":
        return { color: "gray" };
      case "graduated":
        return { color: "blue" };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Students</h1>
      <p>Manage student information and records</p>

      <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "20px" }}>
        <h2>Student Directory</h2>
        <p>View and manage all student records</p>

        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "5px", width: "250px" }}
          />
          <button onClick={handleAddStudent} style={{ marginLeft: "10px", padding: "5px 10px" }}>
            Add Student
          </button>
        </div>

        {isDialogOpen && (
          <div style={{
            border: "1px solid #888",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9"
          }}>
            <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  style={{ marginRight: "5px" }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ width: "250px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="date"
                  value={formData.enrollmentDate}
                  onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <button type="button" onClick={() => setIsDialogOpen(false)} style={{ marginRight: "10px" }}>
                  Cancel
                </button>
                <button type="submit">{editingStudent ? "Update" : "Add"} Student</button>
              </div>
            </form>
          </div>
        )}

        <table border="1" cellPadding="5" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Enrollment Date</th>
              <th>Status</th>
              <th>GPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>{student.studentId}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.enrollmentDate}</td>
                <td style={getStatusStyle(student.status)}>{student.status}</td>
                <td>{student.gpa.toFixed(2)}</td>
                <td>
                  <button onClick={() => handleEditStudent(student)} style={{ marginRight: "5px" }}>Edit</button>
                  <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
