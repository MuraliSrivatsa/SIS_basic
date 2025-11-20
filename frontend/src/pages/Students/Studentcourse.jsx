import { useState } from "react"
import { BookOpen, Users, Clock, Calendar, TrendingUp, Search, Filter, Plus, Edit, BarChart3, Award } from "lucide-react"
import Sidebar from "../../components/sidebars/Sidebar"

export function CoursesManager() {
  const [courses, setCourses] = useState([
    {
      id: '1',
      name: 'Data Structures and Algorithms',
      code: 'CS 201',
      description: 'Fundamental data structures and algorithmic techniques for efficient programming.',
      instructor: 'Dr. Robert Smith',
      department: 'Computer Science',
      credits: 4,
      semester: 'Fall 2024',
      capacity: 40,
      enrolled: 32,
      waitlist: 5,
      schedule: {
        days: ['Monday', 'Wednesday', 'Friday'],
        time: '09:00-10:00',
        room: 'Room 204'
      },
      status: 'active',
      progress: 65,
      rating: 4.7
    },
    {
      id: '2',
      name: 'Calculus I',
      code: 'MATH 101',
      description: 'Introduction to differential and integral calculus with applications.',
      instructor: 'Prof. Maria Johnson',
      department: 'Mathematics',
      credits: 4,
      semester: 'Fall 2024',
      capacity: 35,
      enrolled: 28,
      waitlist: 2,
      schedule: {
        days: ['Tuesday', 'Thursday'],
        time: '11:00-12:30',
        room: 'Room 105'
      },
      status: 'active',
      progress: 45,
      rating: 4.5
    }
    // ... rest of your courses
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const departments = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English']
  const statuses = ['all', 'active', 'upcoming', 'completed']

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || course.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getEnrollmentStatus = (enrolled, capacity) => {
    const percentage = (enrolled / capacity) * 100
    if (percentage >= 90) return { color: 'text-red-600', status: 'Nearly Full' }
    if (percentage >= 75) return { color: 'text-yellow-600', status: 'High Enrollment' }
    if (percentage >= 50) return { color: 'text-green-600', status: 'Good Enrollment' }
    return { color: 'text-blue-600', status: 'Open' }
  }

  const totalStudents = courses.reduce((sum, course) => sum + course.enrolled, 0)
  const totalCapacity = courses.reduce((sum, course) => sum + course.capacity, 0)
  const activeCourses = courses.filter(course => course.status === 'active').length
  const averageRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length

  return (
    <div className="flex">
      <Sidebar role={"student"}/>

      <div className="container space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Course Management</h1>
            <p className="text-gray-500">Manage your courses and track student enrollment</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Course List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map(course => {
            const enrollStatus = getEnrollmentStatus(course.enrolled, course.capacity)
            return (
              <div key={course.id} className="border rounded-lg shadow p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{course.name}</h2>
                  <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{course.description}</p>
                <div className="text-sm text-gray-600 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {course.instructor}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {course.semester}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.schedule.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`${enrollStatus.color} text-sm font-medium`}>{enrollStatus.status}</span>
                  <span className="text-sm">{course.enrolled}/{course.capacity} enrolled</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>
                
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
