import { useState } from "react"
import { motion } from "motion/react"
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Clock,
  GraduationCap,
  Star,
  Eye,
  Edit
} from "lucide-react"

export function FacultyManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const facultyData = [
    {
      id: '1',
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@zendesk.edu',
      phone: '+1 (555) 123-4567',
      address: '123 University Ave, College Town, CT 06511',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c52d7d6d?w=150&h=150&fit=crop&crop=face',
      department: 'Computer Science',
      position: 'Associate Professor',
      joiningDate: '2018-08-15',
      experience: 8,
      qualifications: ['PhD Computer Science', 'MS Software Engineering'],
      specializations: ['Artificial Intelligence', 'Machine Learning'],
      coursesHandled: ['CS 101', 'CS 301', 'CS 401'],
      rating: 4.8,
      studentsCount: 120,
      status: 'active',
      employeeId: 'FAC001',
      salary: '$85,000',
      performanceScore: 92
    }
    // ... add the rest here
  ]

  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English']

  const filteredFaculty = facultyData.filter(faculty => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || faculty.department === departmentFilter
    const matchesStatus = statusFilter === 'all' || faculty.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const calculateTenure = (joiningDate) => {
    const joining = new Date(joiningDate)
    return new Date().getFullYear() - joining.getFullYear()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Users className="h-6 w-6" />
          Faculty & Staff Management
        </h1>
        <p className="text-gray-500">Comprehensive faculty and staff information management</p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty by name, email, or ID..."
            className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="border rounded-md p-2 text-sm"
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
          className="border rounded-md p-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>
      </div>

      {/* Faculty List */}
      <div className="grid gap-6">
        {filteredFaculty.map((faculty) => (
          <div key={faculty.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between">
              {/* Profile */}
              <div className="flex items-start gap-4">
                <img
                  src={faculty.profileImage}
                  alt={faculty.name}
                  className="h-16 w-16 rounded-full border-2"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{faculty.name}</h3>
                    <span className={`px-2 py-1 rounded-md text-xs ${getStatusColor(faculty.status)}`}>
                      {faculty.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{faculty.position}</p>
                  <p className="text-gray-500 text-xs">{faculty.department}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs border rounded px-2 py-1">ID: {faculty.employeeId}</span>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="h-4 w-4 mr-1" />
                      {faculty.rating}
                    </div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <button className="border rounded px-3 py-1 text-sm flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button className="border rounded px-3 py-1 text-sm flex items-center gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Contact</h4>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> {faculty.email}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {faculty.phone}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {faculty.address}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Professional</h4>
                <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Joined: {formatDate(faculty.joiningDate)} ({calculateTenure(faculty.joiningDate)} yrs)</p>
                <p className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> {faculty.experience} years exp.</p>
                <p className="flex items-center gap-2"><Users className="h-4 w-4" /> {faculty.studentsCount} students</p>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mt-6">
              <h4 className="font-semibold text-sm mb-2">Qualifications</h4>
              <div className="flex flex-wrap gap-2">
                {faculty.qualifications.map((q, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs">{q}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No faculty members found</p>
        </div>
      )}
    </div>
  )
}
