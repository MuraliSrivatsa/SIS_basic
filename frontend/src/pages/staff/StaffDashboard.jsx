import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, BookOpen, ClipboardList, GraduationCap, Calendar, LogOut, User, Mail, IdCard, Clock, AlertTriangle } from "lucide-react"
import TeacherSidebar from "./TeacherSideBar1"

const AnimatedCounter = ({ value, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime
    let animationFrame

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (

    <motion.span
      key={value}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  )
}

const FloatingBadge = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 15, delay: delay / 1000 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
  >
    {children}
  </motion.div>
)

export default function StaffDashboard({ user, onLogout }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teachingStats = { totalStudents: 127, activeCourses: 4, pendingGrades: 23, upcomingClasses: 8 }

  const myCourses = [
    { code: "CS 201", name: "Data Structures", students: 32, schedule: "MWF 10:00-11:00 AM", room: "Room 204", nextClass: "2024-08-21 10:00 AM", pendingAssignments: 8 },
    { code: "CS 101", name: "Intro to Programming", students: 45, schedule: "TTH 2:00-3:30 PM", room: "Room 150", nextClass: "2024-08-22 2:00 PM", pendingAssignments: 12 },
    { code: "CS 301", name: "Advanced Algorithms", students: 28, schedule: "MWF 1:00-2:00 PM", room: "Room 301", nextClass: "2024-08-21 1:00 PM", pendingAssignments: 3 },
    { code: "CS 401", name: "Senior Capstone", students: 22, schedule: "TTH 9:00-10:30 AM", room: "Room 125", nextClass: "2024-08-22 9:00 AM", pendingAssignments: 0 }
  ]

  const recentSubmissions = [
    { student: "John Smith", assignment: "Binary Tree Implementation", course: "CS 201", submittedAgo: "2 hours ago", status: "new" },
    { student: "Sarah Johnson", assignment: "Algorithm Analysis", course: "CS 301", submittedAgo: "4 hours ago", status: "reviewed" },
    { student: "Michael Brown", assignment: "Final Project Proposal", course: "CS 401", submittedAgo: "1 day ago", status: "new" },
    { student: "Emily Davis", assignment: "Loop Structures Lab", course: "CS 101", submittedAgo: "2 days ago", status: "graded" }
  ]

  const upcomingDeadlines = [
    { assignment: "Project 2", course: "CS 201", dueDate: "2024-08-25", submissions: 25, total: 32 },
    { assignment: "Midterm Exam", course: "CS 101", dueDate: "2024-08-27", submissions: 0, total: 45 },
    { assignment: "Research Paper", course: "CS 301", dueDate: "2024-08-30", submissions: 18, total: 28 }
  ]

  const formatNextClass = (nextClass) => {
    const date = new Date(nextClass)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    if (date.toDateString() === today.toDateString()) return `Today at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
    if (date.toDateString() === tomorrow.toDateString()) return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
    return `${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`
  }

  const getSubmissionStatus = (status) => {
    const color = status === "new" ? "bg-red-100 text-red-700" : status === "reviewed" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-700"
    return <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>{status}</span>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due Today"
    if (diffDays === 1) return "Due Tomorrow"
    return `Due in ${diffDays} days`
  }

  return (
    <div className="flex">
      <TeacherSidebar />
      <motion.div className="space-y-6 mx-auto p-6 container" initial="hidden" animate="visible">

        {/* Profile */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border rounded-lg shadow">
          <h2 className="font-semibold flex items-center gap-2 mb-4"><User className="h-5 w-5 text-green-600" /> Faculty Profile</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2"><IdCard className="h-4 w-4 text-gray-500" /><div><p className="text-sm text-gray-500">Faculty ID</p><p className="font-medium">{user.id}</p></div></div>
            <div className="flex items-center gap-2"><User className="h-4 w-4 text-gray-500" /><div><p className="text-sm text-gray-500">Full Name</p><p className="font-medium">{user.username}</p></div></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /><div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{user.email}</p></div></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Students", value: teachingStats.totalStudents, icon: <Users className="h-4 w-4 text-blue-600" />, note: "Across all courses" },
            { label: "Active Courses", value: teachingStats.activeCourses, icon: <BookOpen className="h-4 w-4 text-green-600" />, note: "This semester" },
            { label: "Pending Grades", value: teachingStats.pendingGrades, icon: <ClipboardList className="h-4 w-4 text-orange-500" />, note: "Need review" },
            { label: "Upcoming Classes", value: teachingStats.upcomingClasses, icon: <Calendar className="h-4 w-4 text-purple-600" />, note: "This week" }
          ].map((stat, i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{stat.label}</p>{stat.icon}
              </div>
              <div className="text-2xl font-bold"><AnimatedCounter value={stat.value} /></div>
              <p className="text-xs text-gray-500">{stat.note}</p>
            </div>
          ))}
        </div>

        {/* Alert */}
        <AnimatePresence>
          {teachingStats.pendingGrades > 0 && (
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg flex gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <p>You have <strong>{teachingStats.pendingGrades}</strong> assignments pending review.</p>
            </div>
          )}
        </AnimatePresence>

        {/* Courses + Submissions */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg bg-white shadow">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><BookOpen className="h-5 w-5" /> My Courses <span className="ml-2 px-2 py-0.5 border rounded text-sm">{myCourses.length}</span></h3>
            <div className="space-y-3">
              {myCourses.map((c, i) => (
                <div key={c.code} className="p-3 border rounded-lg bg-gradient-to-r from-white to-green-50">
                  <div className="flex justify-between mb-2"><div><p className="font-medium">{c.code} - {c.name}</p><p className="text-sm text-gray-500">{c.schedule}</p></div><span className="px-2 py-1 border rounded text-xs">{c.students} students</span></div>
                  <div className="flex justify-between text-sm text-gray-500"><span>Next class: {formatNextClass(c.nextClass)}</span>{c.pendingAssignments > 0 && <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{c.pendingAssignments} pending</span>}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-white shadow">
            <h3 className="font-semibold flex items-center gap-2 mb-4"><ClipboardList className="h-5 w-5" /> Recent Submissions <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded text-sm">{recentSubmissions.filter(s => s.status === 'new').length}</span></h3>
            <div className="space-y-3">
              {recentSubmissions.map((s, i) => (
                <div key={i} className="p-3 border rounded-lg bg-gradient-to-r from-white to-blue-50 flex justify-between">
                  <div><p className="font-medium">{s.student}</p><p className="text-sm text-gray-500">{s.assignment}</p><p className="text-xs text-gray-500">{s.course} • {s.submittedAgo}</p></div>
                  {getSubmissionStatus(s.status)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deadlines */}
        <div className="p-6 border rounded-lg bg-white shadow">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Clock className="h-5 w-5" /> Upcoming Deadlines</h3>
          <div className="space-y-4">
            {upcomingDeadlines.map((d, i) => (
              <div key={i} className="p-4 border rounded-lg bg-gradient-to-r from-white to-purple-50">
                <div className="flex justify-between mb-2"><div><p className="font-medium">{d.assignment}</p><p className="text-sm text-gray-500">{d.course}</p></div><div className="text-right"><p className="text-sm font-medium">{formatDate(d.dueDate)}</p><p className="text-xs text-gray-500"><AnimatedCounter value={d.submissions} />/{d.total} submitted</p></div></div>
                <div className="h-2 bg-gray-200 rounded overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-600" initial={{ width: 0 }} animate={{ width: `${(d.submissions / d.total) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
