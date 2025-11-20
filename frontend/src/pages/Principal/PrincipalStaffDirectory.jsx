import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Plus,
  Eye,
  Edit,
  Star
} from "lucide-react";
import PrincipalSidebar from "./PrincipalSideBar";
import Sidebar from "../../components/sidebars/Sidebar";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const mockStaffData = [
  {
    id: "1",
    name: "Dr. Sarah Smith",
    role: "Associate Professor",
    department: "Computer Science",
    email: "sarah.smith@zendesk.edu",
    phone: "+1 (555) 123-4567",
    joiningDate: "2018-08-15",
    location: "123 University Ave, College Town, CT 06511",
    status: "active",
    employeeId: "FAC001",
    experience: "8 years",
    students: 120,
    qualifications: ["PhD Computer Science", "MS Software Engineering"],
    specializations: ["Artificial Intelligence", "Machine Learning"],
    courses: ["CS 101", "CS 301", "CS 401"],
    performance: "92%",
    rating: "4.8/5.0",
    salary: "$85,000"
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    role: "Physics Professor",
    department: "Science",
    email: "michael.chen@zendesk.edu",
    phone: "+1 (555) 234-5678",
    joiningDate: "2017-01-20",
    location: "Building B - Lab 101",
    status: "active",
    employeeId: "EMP002",
    experience: "15 years",
    students: 95,
    qualifications: ["PhD Physics"],
    specializations: ["Quantum Physics", "Thermodynamics"],
    courses: ["PHY 201", "PHY 301"],
    performance: "89%",
    rating: "4.6/5.0",
    salary: "$78,000"
  },
  {
    id: "3",
    name: "Ms. Emily Rodriguez",
    role: "English Literature Teacher",
    department: "Literature",
    email: "emily.rodriguez@zendesk.edu",
    phone: "+1 (555) 345-6789",
    joiningDate: "2020-09-01",
    location: "Building C - Room 305",
    status: "active",
    employeeId: "EMP003",
    experience: "8 years",
    students: 110,
    qualifications: ["MA English Literature"],
    specializations: ["Creative Writing", "Poetry"],
    courses: ["ENG 101", "ENG 205"],
    performance: "90%",
    rating: "4.7/5.0",
    salary: "$70,000"
  }
];

export function StaffDirectory() {
  const [staffData] = useState(mockStaffData);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const departments = Array.from(new Set(staffData.map((staff) => staff.department)));

  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex">
      <Sidebar role={"principal"}/>
      <div className="container space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Staff Directory</h1>
            <p className="text-gray-500">
              Complete staff details with joining dates and course assignments
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Staff
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-md p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            {/* Input field */}
            <input
              type="text"
              placeholder="Search by name, email, or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-md p-2 pr-10 
               transition-all duration-300 ease-in-out 
               "
            />

            {/* Search Icon (right aligned inside input) */}
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 
                     transition-colors duration-300 group-hover:text-blue-500" />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="bg-white shadow rounded-md p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Staff</p>
                <p className="text-2xl">{staffData.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white shadow rounded-md p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl">
                  {staffData.filter((s) => s.status === "active").length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white shadow rounded-md p-6 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <User className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl">
                  {staffData.filter((s) => s.status === "on-leave").length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white shadow rounded-md p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-3">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Departments</p>
                <p className="text-2xl">{departments.length}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Staff List */}
        <motion.div className="space-y-6">
          {filteredStaff.map((staff) => (
            <motion.div
              key={staff.id}
              className="bg-white shadow rounded-md p-6 hover:shadow-lg transition"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 text-lg font-bold">
                    {staff.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{staff.name}</h3>
                    <p className="text-sm text-gray-500">{staff.role}</p>
                    <p className="text-sm text-gray-500">{staff.department}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                        ID: {staff.employeeId}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${getStatusBadgeColor(staff.status)}`}>
                        {staff.status}
                      </span>
                      {staff.rating && (
                        <span className="flex items-center text-yellow-500 text-sm">
                          <Star className="w-4 h-4 mr-1" /> {staff.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
                    <Eye className="w-4 h-4 mr-1" /> View Details
                  </button>
                  <button className="flex items-center border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </button>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-sm text-gray-700">
                {/* Contact Info */}
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="flex items-center mb-1">
                    <Mail className="w-4 h-4 mr-2" /> {staff.email}
                  </div>
                  <div className="flex items-center mb-1">
                    <Phone className="w-4 h-4 mr-2" /> {staff.phone}
                  </div>
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-2" /> {staff.location}
                  </div>

                  {staff.qualifications?.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-4 mb-2">Qualifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {staff.qualifications.map((q, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {q}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {staff.specializations?.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-4 mb-2">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {staff.specializations.map((s, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Professional Details */}
                <div>
                  <h4 className="font-semibold mb-2">Professional Details</h4>
                  <div className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-2" /> Joined: {new Date(staff.joiningDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center mb-1">
                    <BookOpen className="w-4 h-4 mr-2" /> {staff.experience} experience
                  </div>
                  {staff.students && (
                    <div className="flex items-center mb-1">
                      <User className="w-4 h-4 mr-2" /> {staff.students} students
                    </div>
                  )}

                  {staff.courses?.length > 0 && (
                    <>
                      <h4 className="font-semibold mt-4 mb-2">Courses Handled</h4>
                      <div className="flex flex-wrap gap-2">
                        {staff.courses.map((c, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {c}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Footer Stats */}
              {(staff.performance || staff.rating || staff.salary) && (
                <div className="grid grid-cols-3 text-center mt-6 border-t pt-4">
                  <div>
                    <p className="text-green-600 font-bold">{staff.performance}</p>
                    <p className="text-xs text-gray-500">Performance Score</p>
                  </div>
                  <div>
                    <p className="text-blue-600 font-bold">{staff.rating}</p>
                    <p className="text-xs text-gray-500">Student Rating</p>
                  </div>
                  <div>
                    <p className="text-purple-600 font-bold">{staff.salary}</p>
                    <p className="text-xs text-gray-500">Annual Salary</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filteredStaff.length === 0 && (
          <div className="bg-white p-6 rounded-md shadow text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">No staff found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
