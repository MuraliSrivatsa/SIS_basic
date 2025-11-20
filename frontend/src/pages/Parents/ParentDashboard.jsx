import { useState } from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  LogOut,
  User,
  Mail,
  IdCard,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone
} from "lucide-react";
import ParentSidebar from "./Parent_sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

export default function ParentDashboard({ user, onLogout }) {
  // Mock data for parent dashboard
  const children = [
    {
      name: "John Smith",
      studentId: "STU001",
      grade: "Grade 10",
      gpa: 3.75,
      attendance: 96,
      courses: 6,
      upcomingAssignments: 3,
      recentGrades: [
        { subject: "Mathematics", grade: "A-", assignment: "Midterm Exam" },
        { subject: "Physics", grade: "B+", assignment: "Lab Report" },
        { subject: "English", grade: "A", assignment: "Essay" }
      ],
      alerts: [
        { type: "assignment", message: "Physics homework due tomorrow", urgent: true },
        { type: "grade", message: "New grade posted in Mathematics", urgent: false }
      ]
    },
    {
      name: "Emma Smith",
      studentId: "STU005",
      grade: "Grade 8",
      gpa: 3.95,
      attendance: 98,
      courses: 5,
      upcomingAssignments: 2,
      recentGrades: [
        { subject: "Science", grade: "A", assignment: "Chapter Test" },
        { subject: "History", grade: "A-", assignment: "Research Project" },
        { subject: "Art", grade: "A", assignment: "Portfolio" }
      ],
      alerts: [
        { type: "attendance", message: "Perfect attendance this month!", urgent: false }
      ]
    }
  ];

  const upcomingEvents = [
    { date: "2024-08-25", event: "Parent-Teacher Conference", child: "John Smith", time: "2:00 PM" },
    { date: "2024-08-28", event: "Science Fair", child: "Emma Smith", time: "10:00 AM" },
    { date: "2024-08-30", event: "Math Competition", child: "John Smith", time: "9:00 AM" }
  ];

  const recentCommunications = [
    { from: "Dr. Smith - Mathematics", message: "John's improvement in algebra is excellent", date: "2024-08-18", child: "John Smith" },
    { from: "Ms. Johnson - Science", message: "Emma's science project is outstanding", date: "2024-08-17", child: "Emma Smith" },
    { from: "Principal Wilson", message: "Semester progress reports available", date: "2024-08-16", child: "Both" }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case "assignment":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "grade":
        return <GraduationCap className="h-4 w-4 text-blue-500" />;
      case "attendance":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const totalChildren = children.length;
  const averageGPA = children.reduce((sum, child) => sum + child.gpa, 0) / children.length;
  const averageAttendance = Math.round(children.reduce((sum, child) => sum + child.attendance, 0) / children.length);
  const totalAlerts = children.reduce((sum, child) => sum + child.alerts.length, 0);

  return (
    <div className="flex">
      <Sidebar role={"parent"}/>
      {/* Parent Profile */}
      <div className="container space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border p-4 rounded-lg">
          <h2 className="flex items-center gap-2 font-semibold mb-4">
            <User className="h-5 w-5 text-purple-600" /> Parent Profile
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-2">
              <IdCard className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Parent ID</p>
                <p className="font-medium">{user.parentId}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Children</span>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">{totalChildren}</div>
            <p className="text-xs text-gray-500">Under your care</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Average GPA</span>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{averageGPA.toFixed(2)}</div>
            <p className="text-xs text-gray-500">Academic performance</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Avg Attendance</span>
              <Calendar className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{averageAttendance}%</div>
            <p className="text-xs text-gray-500">School attendance</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Active Alerts</span>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold">{totalAlerts}</div>
            <p className="text-xs text-gray-500">Requiring attention</p>
          </div>
        </div>

        {/* Alerts */}
        {totalAlerts > 0 && (
          <div className="flex items-center gap-2 p-4 border rounded-lg bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <p>You have {totalAlerts} active notifications about your children's academic activities.</p>
          </div>
        )}

        {/* Children Overview + Events */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h3 className="flex items-center gap-2 font-semibold mb-4">
              <Users className="h-5 w-5" /> My Children
            </h3>
            <div className="space-y-6">
              {children.map((child, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium">{child.name}</p>
                      <p className="text-sm text-gray-500">{child.grade} • ID: {child.studentId}</p>
                    </div>
                    <span className="px-2 py-1 text-xs border rounded">GPA: {child.gpa}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Attendance</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-gray-200 rounded">
                          <div
                            className="h-2 bg-green-500 rounded"
                            style={{ width: `${child.attendance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{child.attendance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Courses</p>
                      <p className="font-medium">{child.courses} enrolled</p>
                    </div>
                  </div>

                  {child.alerts.length > 0 && (
                    <div className="space-y-2">
                      {child.alerts.map((alert, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded text-sm ${alert.urgent ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"
                            }`}
                        >
                          {getAlertIcon(alert.type)}
                          <span>{alert.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border rounded hover:bg-gray-100">
              View Detailed Reports
            </button>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="flex items-center gap-2 font-semibold mb-4">
              <Calendar className="h-5 w-5" /> Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <p className="text-sm text-gray-500">{event.child} • {event.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(event.date)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border rounded hover:bg-gray-100">
              View Full Calendar
            </button>
          </div>
        </div>

        {/* Recent Communications */}
        <div className="p-4 border rounded-lg">
          <h3 className="flex items-center gap-2 font-semibold mb-4">
            <Phone className="h-5 w-5" /> Recent Communications
          </h3>
          <div className="space-y-4">
            {recentCommunications.map((comm, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{comm.from}</p>
                  <p className="text-sm text-gray-500">{new Date(comm.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{comm.message}</p>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">Child: {comm.child}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 px-4 py-2 border rounded hover:bg-gray-100">
            View All Messages
          </button>
        </div>
      </div>
    </div>
  );
}
