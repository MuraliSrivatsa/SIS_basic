import { useState } from "react"
import { motion } from "motion/react"
import { 
  Calendar as CalendarIcon, 
  Clock, 
  BookOpen, 
  Users, 
  MapPin,
  Bell,
  Edit,
  Plus,
  AlertTriangle,
  CheckCircle
} from "lucide-react"

export function UpcomingExamsTests() {
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const examsTests = [
    {
      id: '1',
      title: 'Midterm Examination',
      type: 'exam',
      subject: 'Mathematics',
      class: 'Grade 10',
      date: '2024-10-25',
      time: '09:00 AM',
      duration: 180,
      venue: 'Main Hall',
      instructor: 'Prof. Robert Johnson',
      studentsCount: 120,
      maxMarks: 100,
      syllabus: ['Algebra', 'Geometry', 'Trigonometry'],
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Science Quiz',
      type: 'quiz',
      subject: 'Physics',
      class: 'Grade 11',
      date: '2024-10-22',
      time: '02:00 PM',
      duration: 60,
      venue: 'Physics Lab',
      instructor: 'Dr. Maria Rodriguez',
      studentsCount: 85,
      maxMarks: 50,
      syllabus: ['Mechanics', 'Waves'],
      status: 'scheduled',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'English Literature Test',
      type: 'test',
      subject: 'English',
      class: 'Grade 12',
      date: '2024-10-23',
      time: '10:30 AM',
      duration: 120,
      venue: 'Room 201',
      instructor: 'Ms. Sarah Williams',
      studentsCount: 95,
      maxMarks: 75,
      syllabus: ['Shakespeare', 'Modern Poetry', 'Essay Writing'],
      status: 'scheduled',
      priority: 'medium'
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800'
      case 'test': return 'bg-blue-100 text-blue-800'
      case 'quiz': return 'bg-green-100 text-green-800'
      case 'assignment': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled': return Clock
      case 'ongoing': return AlertTriangle
      case 'completed': return CheckCircle
      default: return Clock
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysUntil = (dateString) => {
    const examDate = new Date(dateString)
    const today = new Date()
    const diffTime = examDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const filteredExams = examsTests.filter(exam => {
    const daysUntil = getDaysUntil(exam.date)
    if (filter === 'this-week' && daysUntil > 7) return false
    if (filter === 'this-month' && daysUntil > 30) return false
    if (typeFilter !== 'all' && exam.type !== typeFilter) return false
    return true
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold">
            <CalendarIcon className="h-6 w-6" />
            Upcoming Exams & Tests
          </h1>
          <p className="text-gray-500">Monitor and manage all scheduled assessments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Schedule New
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex gap-2">
          {['all', 'this-week', 'this-month'].map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1 rounded-lg text-sm capitalize border ${
                filter === option ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              {option.replace('-', ' ')}
            </button>
          ))}
        </div>
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All Types</option>
          <option value="exam">Exams</option>
          <option value="test">Tests</option>
          <option value="quiz">Quizzes</option>
          <option value="assignment">Assignments</option>
        </select>
      </div>

      {/* Exam Cards */}
      <div className="grid gap-4">
        {filteredExams.map((exam, index) => {
          const daysUntil = getDaysUntil(exam.date)
          const StatusIcon = getStatusIcon(exam.status)

          return (
            <motion.div 
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border shadow bg-white transition hover:shadow-lg ${
                daysUntil <= 3 ? 'border-l-4 border-l-red-500 bg-red-50/50' : 
                daysUntil <= 7 ? 'border-l-4 border-l-orange-500 bg-orange-50/50' : 
                'border-l-4 border-l-blue-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">{exam.title}</h2>
                      <span className={`px-2 py-1 rounded text-xs ${getTypeColor(exam.type)}`}>
                        {exam.type}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(exam.priority)}`} />
                    </div>
                    <p className="text-sm text-gray-500">{exam.subject} • {exam.class} • {exam.instructor}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> {formatDate(exam.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {exam.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {exam.venue}</span>
                    </div>
                  </div>
                </div>
                <div>
                  {daysUntil <= 3 && (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800 animate-pulse">
                      {daysUntil === 0 ? 'Today' : `${daysUntil} days`}
                    </span>
                  )}
                  {daysUntil > 3 && daysUntil <= 7 && (
                    <span className="px-2 py-1 text-xs rounded bg-orange-100 text-orange-800">
                      {daysUntil} days
                    </span>
                  )}
                  {daysUntil > 7 && (
                    <span className="px-2 py-1 text-xs rounded border text-gray-600">
                      {daysUntil} days
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-3 text-sm">
                <div>
                  <h4 className="font-medium">Exam Details</h4>
                  <p>Duration: {exam.duration ? `${exam.duration} minutes` : 'No time limit'}</p>
                  <p>Max Marks: {exam.maxMarks}</p>
                  <p>Students: {exam.studentsCount}</p>
                </div>
                <div className="lg:col-span-2">
                  <h4 className="font-medium">Syllabus Coverage</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {exam.syllabus.map((topic, i) => (
                      <span key={i} className="px-2 py-1 text-xs border rounded">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <StatusIcon className="h-4 w-4" />
                  <span className="capitalize">{exam.status}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded text-sm flex items-center gap-1 hover:bg-gray-100">
                    <Edit className="h-3 w-3" /> Edit
                  </button>
                  <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
                    View Details
                  </button>
                  {daysUntil <= 1 && (
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-sm flex items-center gap-1 hover:bg-red-700">
                      <Bell className="h-3 w-3" /> Send Reminder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <CalendarIcon className="h-12 w-12 mx-auto mb-2" />
          <h3 className="font-medium">No exams scheduled</h3>
          <p>No exams or tests match your current filter criteria</p>
        </div>
      )}
    </motion.div>
  )
}
