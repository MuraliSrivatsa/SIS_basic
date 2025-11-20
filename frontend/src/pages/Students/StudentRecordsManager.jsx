import { useState } from "react";
import { GraduationCap, Search, Calendar, TrendingUp, Eye, Edit, FileText, Download, Users, Mail, Phone, MapPin } from "lucide-react";

export function StudentRecordsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const students = [
    {
      id: "1",
      studentId: "STU001",
      name: "Alex Johnson",
      profileImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      email: "alex.johnson@zendesk.edu",
      phone: "+1 (555) 123-4567",
      address: "123 Student St, College Town, CT 06511",
      admissionDate: "2020-09-01",
      currentGrade: "Grade 10",
      status: "active",
      guardianName: "Michael Johnson",
      guardianPhone: "+1 (555) 123-4568",
      totalGPA: 3.7,
      attendanceRate: 94,
      disciplinaryRecords: 0,
      academicHistory: [
        {
          year: "2020-2021",
          grade: "Grade 6",
          gpa: 3.5,
          attendance: 92,
          subjects: [
            { name: "Mathematics", grade: "B+", score: 87, teacher: "Ms. Smith" },
            { name: "Science", grade: "A-", score: 90, teacher: "Dr. Wilson" },
            { name: "English", grade: "B", score: 85, teacher: "Mr. Brown" },
          ],
          achievements: ["Honor Roll", "Science Fair Participant"],
          remarks: "Excellent student with strong academic performance",
        },
        {
          year: "2021-2022",
          grade: "Grade 7",
          gpa: 3.6,
          attendance: 93,
          subjects: [
            { name: "Mathematics", grade: "A-", score: 90, teacher: "Ms. Smith" },
            { name: "Science", grade: "A", score: 94, teacher: "Dr. Wilson" },
            { name: "English", grade: "B+", score: 88, teacher: "Mr. Brown" },
          ],
          achievements: ["Honor Roll", "Math Competition Winner"],
          remarks: "Continued improvement in all subjects",
        },
      ],
    },
    // ... Add more students as needed
  ];

  const getYearsOfData = (student) => student.academicHistory.length;
  const getGPATrend = (student) => {
    const gpas = student.academicHistory.map((y) => y.gpa);
    if (gpas.length < 2) return "stable";
    const recent = gpas.slice(-2);
    if (recent[1] > recent[0]) return "improving";
    if (recent[1] < recent[0]) return "declining";
    return "stable";
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "declining":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      case "transferred":
        return "bg-orange-100 text-orange-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === "all" || student.currentGrade === gradeFilter;
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesYear =
      yearFilter === "all" || student.academicHistory.some((y) => y.year === yearFilter);
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "current" && student.status === "active") ||
      (activeTab === "graduated" && student.status === "graduated") ||
      (activeTab === "alumni" &&
        (student.status === "graduated" || student.status === "transferred"));
    return matchesSearch && matchesGrade && matchesStatus && matchesYear && matchesTab;
  });

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    graduates: students.filter((s) => s.status === "graduated").length,
    averageYearsData: Math.round(
      students.reduce((sum, s) => sum + getYearsOfData(s), 0) / students.length
    ),
    averageGPA: (students.reduce((sum, s) => sum + s.totalGPA, 0) / students.length).toFixed(2),
  };

  const years = ["2019-2020", "2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"];
  const grades = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <GraduationCap className="h-6 w-6" />
            Student Records Management
          </h1>
          <p className="text-gray-500">Comprehensive 5-year academic records for all students</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Download className="h-4 w-4" />
          Export Records
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { title: "Total Records", value: stats.totalStudents, color: "bg-blue-500" },
          { title: "Active Students", value: stats.activeStudents, color: "bg-green-500" },
          { title: "Graduates", value: stats.graduates, color: "bg-purple-500" },
          { title: "Avg Years Data", value: stats.averageYearsData, color: "bg-orange-500" },
          { title: "Avg GPA", value: stats.averageGPA, color: "bg-indigo-500" },
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <p className="font-bold text-xl">{stat.value}</p>
            </div>
            <div className={`${stat.color} w-8 h-8 rounded flex items-center justify-center`} />
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="graduated">Graduated</option>
          <option value="transferred">Transferred</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button onClick={() => setActiveTab("all")} className={`pb-1 ${activeTab === "all" ? "border-b-2 border-blue-600" : ""}`}>
          All Records ({students.length})
        </button>
        <button onClick={() => setActiveTab("current")} className={`pb-1 ${activeTab === "current" ? "border-b-2 border-blue-600" : ""}`}>
          Current Students ({stats.activeStudents})
        </button>
        <button onClick={() => setActiveTab("graduated")} className={`pb-1 ${activeTab === "graduated" ? "border-b-2 border-blue-600" : ""}`}>
          Graduates ({stats.graduates})
        </button>
        <button onClick={() => setActiveTab("alumni")} className={`pb-1 ${activeTab === "alumni" ? "border-b-2 border-blue-600" : ""}`}>
          Alumni ({stats.graduates})
        </button>
      </div>

      {/* Student Cards */}
      <div className="grid gap-6">
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium mb-2">No student records found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredStudents.map((student) => {
            const trend = getGPATrend(student);
            return (
              <div key={student.id} className="bg-white rounded shadow p-4 hover:shadow-lg transition-all">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <img
                      src={student.profileImage}
                      alt={student.name}
                      className="h-16 w-16 rounded-full border-2 border-gray-200"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold">{student.name}</h3>
                        <span className={`${getStatusColor(student.status)} px-2 py-1 rounded text-xs`}>
                          {student.status}
                        </span>
                        <span className="border px-2 py-1 rounded text-xs">ID: {student.studentId}</span>
                      </div>
                      <div className="text-gray-500 text-sm space-y-1">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {student.email}</span>
                          <span className="flex items-center gap-1"><Phone className="h-4 w-4" /> {student.phone}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(student.admissionDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {student.currentGrade}</span>
                        </div>
                        <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {student.address}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-gray-500 text-sm">
                    <p>Guardian: {student.guardianName}</p>
                    <p>{student.guardianPhone}</p>
                    <p>{getYearsOfData(student)} Years Data</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
