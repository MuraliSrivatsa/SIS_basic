import {
  Users, BookOpen, GraduationCap, Calendar, LogOut, User,
  TrendingUp, AlertTriangle, CheckCircle, Building, Bell, BarChart3
} from "lucide-react"
import PrincipalSidebar from "./PrincipalSideBar"
import Sidebar from "../../components/sidebars/Sidebar"


export default function PrincipalDashboard({ user, onLogout }) {
  // Mock data
  const schoolStats = {
    totalStudents: 1247,
    totalTeachers: 85,
    totalCourses: 156,
    attendanceRate: 94.5,
    graduationRate: 87.2,
    averageGPA: 3.42
  }

  const recentAlerts = [
    { type: "discipline", message: "3 new discipline reports requiring review", urgent: true, count: 3 },
    { type: "attendance", message: "15 students with concerning attendance patterns", urgent: true, count: 15 },
    { type: "academic", message: "Semester grades due in 3 days", urgent: false, count: null },
    { type: "maintenance", message: "HVAC system scheduled maintenance tomorrow", urgent: false, count: null }
  ]

  const departmentPerformance = [
    { department: "Mathematics", teachers: 12, students: 245, avgGPA: 3.65, satisfaction: 89 },
    { department: "Science", teachers: 15, students: 298, avgGPA: 3.58, satisfaction: 92 },
    { department: "English", teachers: 10, students: 312, avgGPA: 3.45, satisfaction: 85 },
    { department: "History", teachers: 8, students: 187, avgGPA: 3.38, satisfaction: 88 },
    { department: "Physical Education", teachers: 6, students: 456, avgGPA: 3.72, satisfaction: 94 }
  ]

  const upcomingEvents = [
    { date: "2024-08-25", event: "Faculty Meeting", time: "3:00 PM", location: "Conference Room A" },
    { date: "2024-08-27", event: "School Board Presentation", time: "7:00 PM", location: "Auditorium" },
    { date: "2024-08-30", event: "Parent-Teacher Conference Setup", time: "2:00 PM", location: "Gymnasium" },
    { date: "2024-09-02", event: "New Semester Orientation", time: "9:00 AM", location: "Main Hall" }
  ]

  const recentActivities = [
    { activity: "Approved new AP Computer Science course", time: "2 hours ago", type: "academic" },
    { activity: "Reviewed teacher performance evaluations", time: "4 hours ago", type: "hr" },
    { activity: "Met with student council representatives", time: "1 day ago", type: "student" },
    { activity: "Approved budget allocation for science lab", time: "2 days ago", type: "budget" }
  ]

  const urgentAlerts = recentAlerts.filter(alert => alert.urgent).length

  const getAlertIcon = (type) => {
    switch (type) {
      case "discipline": return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "attendance": return <Calendar className="h-4 w-4 text-orange-500" />
      case "academic": return <GraduationCap className="h-4 w-4 text-blue-500" />
      case "maintenance": return <Building className="h-4 w-4 text-green-500" />
      default: return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "academic": return <BookOpen className="h-4 w-4 text-blue-500" />
      case "hr": return <Users className="h-4 w-4 text-green-500" />
      case "student": return <GraduationCap className="h-4 w-4 text-purple-500" />
      case "budget": return <TrendingUp className="h-4 w-4 text-orange-500" />
      default: return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Past"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `In ${diffDays} days`
  }

  return (
    <div className="flex">
      <Sidebar role={"principal"}/>
      <div className="container space-y-6 p-6">
        

        {/* Principal Profile */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4 shadow">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-indigo-600" /> Principal Profile
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Principal ID</p>
              <p className="font-medium">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Institution</p>
              <p className="font-medium">University College</p>
            </div>
          </div>
        </div>

        {/* School Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Total Students", value: schoolStats.totalStudents, icon: <Users className="h-4 w-4 text-blue-600" /> },
            { label: "Faculty", value: schoolStats.totalTeachers, icon: <GraduationCap className="h-4 w-4 text-green-600" /> },
            { label: "Courses", value: schoolStats.totalCourses, icon: <BookOpen className="h-4 w-4 text-purple-600" /> },
            { label: "Attendance Rate", value: `${schoolStats.attendanceRate}%`, icon: <Calendar className="h-4 w-4 text-orange-500" /> },
            { label: "Graduation Rate", value: `${schoolStats.graduationRate}%`, icon: <TrendingUp className="h-4 w-4 text-green-500" /> },
            { label: "Average GPA", value: schoolStats.averageGPA, icon: <GraduationCap className="h-4 w-4 text-blue-500" /> },
          ].map((stat, i) => (
            <div key={i} className="p-4 border rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">{stat.label}</h3>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Alerts */}
        {urgentAlerts > 0 && (
          <div className="flex items-center gap-2 p-3 border border-red-300 bg-red-50 rounded-md text-red-600">
            <AlertTriangle className="h-4 w-4" />
            <p>You have {urgentAlerts} urgent matters requiring immediate attention.</p>
          </div>
        )}

        {/* Alerts & Events */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Alerts */}
          <div className="p-4 border rounded-lg shadow">
            <h2 className="font-semibold flex items-center gap-2 mb-2">
              <Bell className="h-5 w-5" /> School Alerts
            </h2>
            {recentAlerts.map((alert, idx) => (
              <div key={idx} className={`p-3 border rounded-lg mb-2 ${alert.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    {alert.count && (
                      <span className={`inline-block px-2 py-1 text-xs rounded ${alert.urgent ? "bg-red-500 text-white" : "bg-gray-200"}`}>
                        {alert.count} items
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 border rounded-md hover:bg-gray-100">View All Alerts</button>
          </div>

          {/* Events */}
          <div className="p-4 border rounded-lg shadow">
            <h2 className="font-semibold flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5" /> Upcoming Events
            </h2>
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                <div>
                  <p className="font-medium">{event.event}</p>
                  <p className="text-sm text-gray-500">{event.location} • {event.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatDate(event.date)}</p>
                  <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 border rounded-md hover:bg-gray-100">View Full Calendar</button>
          </div>
        </div>

        {/* Department Performance */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="font-semibold flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5" /> Department Performance
          </h2>
          {departmentPerformance.map((dept, idx) => (
            <div key={idx} className="p-3 border rounded-lg mb-3">
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-medium">{dept.department}</p>
                  <p className="text-sm text-gray-500">{dept.teachers} teachers • {dept.students} students</p>
                </div>
                <span className="px-2 py-1 text-xs border rounded">GPA: {dept.avgGPA}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Student Satisfaction</span>
                  <span>{dept.satisfaction}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${dept.satisfaction}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="p-4 border rounded-lg shadow">
          <h2 className="font-semibold flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5" /> Recent Activities
          </h2>
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg mb-2">
              {getActivityIcon(activity.type)}
              <div>
                <p className="text-sm font-medium">{activity.activity}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
