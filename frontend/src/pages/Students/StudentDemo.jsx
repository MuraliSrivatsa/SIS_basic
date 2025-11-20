// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Student_Sidebar";
import { FaBook, FaClipboardList, FaCalendarAlt, FaChartLine } from "react-icons/fa";

const StudentDemo = ({ user }) => {
  const navigate = useNavigate();

  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [academicOpen, setAcademicOpen] = useState(true);
  const [scheduleOpen, setScheduleOpen] = useState(true);

  useEffect(() => {
    // Simulate async loading
    setTimeout(() => {
      setStudentProfile({
        user: { username: "student_demo" },
        student_id: "STU12345",
        major: "Computer Science",
        gpa: 3.8,
        semester: "Fall 2025",
        address: "123 Demo Street, City",
        phone: "+91 9876543210",
        profileImage: "https://i.pravatar.cc/150?img=11",
        enrollments: [
          {
            course: {
              name: "Data Structures",
              code: "CS201",
              description: "Introduction to data structures and algorithms",
              credits: 4,
            },
            enrolled_date: "2025-07-01",
          },
          {
            course: {
              name: "Calculus I",
              code: "MATH101",
              description: "Fundamentals of differential and integral calculus",
              credits: 3,
            },
            enrolled_date: "2025-07-01",
          },
          {
            course: {
              name: "Physics",
              code: "PHYS201",
              description: "Mechanics, waves, and thermodynamics",
              credits: 4,
            },
            enrolled_date: "2025-07-01",
          },
        ],
      });
      setLoading(false);
    }, 800); // fake delay for demo
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading your dashboard...</div>;
  }

  if (!studentProfile) {
    return <div className="p-6 text-red-600">No student data found.</div>;
  }

  const upcomingAssignments = [
    { title: "Algorithm Analysis Project", course: "CS 201", dueDate: "Oct 25", priority: "high" },
    { title: "Calculus Problem Set 5", course: "MATH 101", dueDate: "Oct 22", priority: "medium" },
    { title: "Physics Lab Report", course: "PHYS 201", dueDate: "Oct 28", priority: "low" },
  ];

  const todaySchedule = [
    { time: "09:00", course: "Data Structures", room: "Room 204", type: "Lecture" },
    { time: "11:00", course: "Calculus I", room: "Room 105", type: "Tutorial" },
    { time: "14:00", course: "Physics", room: "Lab 301", type: "Lab" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-6 space-y-6">
        
        {/* Header / Profile */}
        <div className="bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl shadow-lg p-6 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
              src={studentProfile.profileImage}
              alt={studentProfile.user.username}
              className="h-20 w-20 rounded-full border-4 border-white shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold">Welcome, {studentProfile.user.username}</h1>
              <div className="flex gap-4 mt-2 text-white/90 text-sm">
                <span className="px-3 py-1 bg-white/20 rounded-full">{studentProfile.major}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">ID: {studentProfile.student_id}</span>
              </div>
              <p className="mt-2 text-sm text-white/80">{studentProfile.address}</p>
              <p className="text-sm text-white/80">{studentProfile.phone} · demo@student.com</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold">{studentProfile.gpa}</p>
            <p className="text-sm text-white/80">Current GPA</p>
            <span className="mt-2 inline-block bg-white/30 text-white px-3 py-1 rounded-full text-sm">
              {studentProfile.semester}
            </span>
          </div>
        </div>

        {/* Academic Overview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-5 bg-gray-100 cursor-pointer"
            onClick={() => setAcademicOpen(!academicOpen)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaBook /> Academic Overview
            </h2>
            <span>{academicOpen ? "▲" : "▼"}</span>
          </div>
          {academicOpen && (
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Courses */}
              <div>
                <h3 className="font-medium mb-3 text-gray-700">📚 Current Courses</h3>
                {studentProfile.enrollments.map((enrollment, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 mb-3"
                  >
                    <h4 className="text-lg font-bold text-indigo-700">
                      {enrollment.course.name} ({enrollment.course.code})
                    </h4>
                    <p className="text-gray-600 text-sm">{enrollment.course.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Credits: {enrollment.course.credits}</p>
                    <p className="text-xs text-gray-400">
                      Enrolled on {new Date(enrollment.enrolled_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Assignments */}
              <div>
                <h3 className="font-medium mb-3 text-gray-700">📝 Upcoming Assignments</h3>
                {upcomingAssignments.map((assignment, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 mb-3 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.course}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            assignment.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : assignment.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {assignment.priority}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Due {assignment.dueDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Today Schedule */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-5 bg-gray-100 cursor-pointer"
            onClick={() => setScheduleOpen(!scheduleOpen)}
          >
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FaCalendarAlt /> Today’s Schedule
            </h2>
            <span>{scheduleOpen ? "▲" : "▼"}</span>
          </div>
          {scheduleOpen && (
            <div className="p-6 space-y-3">
              {todaySchedule.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="font-medium text-indigo-700">{item.time}</div>
                  <div className="flex-1 px-4">
                    <p className="font-medium">{item.course}</p>
                    <p className="text-sm text-gray-500">{item.room}</p>
                  </div>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaBook className="mx-auto text-indigo-600 text-2xl mb-2" />
            <p className="text-sm font-medium">Courses Enrolled</p>
            <p className="text-3xl font-bold">{studentProfile.enrollments.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaChartLine className="mx-auto text-green-600 text-2xl mb-2" />
            <p className="text-sm font-medium">Current GPA</p>
            <p className="text-3xl font-bold">{studentProfile.gpa}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaClipboardList className="mx-auto text-yellow-600 text-2xl mb-2" />
            <p className="text-sm font-medium">Assignments Due</p>
            <p className="text-3xl font-bold">{upcomingAssignments.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <FaCalendarAlt className="mx-auto text-red-600 text-2xl mb-2" />
            <p className="text-sm font-medium">Attendance</p>
            <p className="text-3xl font-bold">94%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDemo;
