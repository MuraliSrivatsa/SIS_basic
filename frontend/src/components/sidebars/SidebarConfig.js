import {
    FaTachometerAlt,
    FaUsers,
    FaBullhorn,
    FaCalendarAlt,
    FaClock,
    FaChartBar,
    FaCogs,
    FaUser,
    FaBook,
    FaTasks,
    FaBell,
    FaComments,
    FaRobot,
    FaBookOpen,
    FaTable,
    FaCalendar,
    FaComment,
    FaMoneyBillWave,
    FaUserCog,
    FaChartLine,
    FaClipboardList
} from "react-icons/fa";



export const SidebarMenu = {
    admin: [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "User Management", icon: <FaUsers />, link: "/users" },
        { name: "Announcements", icon: <FaBullhorn />, link: "/admin/announcements" },
        { name: "Calendar", icon: <FaCalendarAlt />, link: "/admin/calendar" },
        { name: "Timetable", icon: <FaClock />, link: "/admin/timetable" },
        { name: "Reports", icon: <FaChartBar />, link: "/admin/reports" },
        { name: "Settings", icon: <FaCogs />, link: "/admin/settings" },
    ],

    student: [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "Profile", icon: <FaUser />, link: "/student_Profile" },
        { name: "My Courses", icon: <FaBook />, link: "/student_course" },
        { name: "Assignments", icon: <FaTasks />, link: "/stud_assignment" },
        { name: "Notifications", icon: <FaBell />, link: "/student_notification" },
        { name: "Timetable", icon: <FaCalendarAlt />, link: "/timetable" },
        { name: "Chat & Comms", icon: <FaComments />, link: "/student_Chat" },
        { name: "AI Recommendation", icon: <FaRobot />, link: "/ai-recommendation" },
        { name: "Calendar & Events", icon: <FaCalendarAlt />, link: "/studentCalendar" },
    ],

    staff: [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "Profile", icon: <FaUser />, link: "/teacher/profile" },
        { name: "Courses", icon: <FaBook />, link: "/teacher/courses" },
        { name: "Students", icon: <FaUsers />, link: "/teacher/students" },
        { name: "Assignment", icon: <FaTasks />, link: "/teacher/assignment" },
        { name: "Announcement", icon: <FaBullhorn />, link: "/teacher/announcement" },
        { name: "Lesson Plan", icon: <FaBookOpen />, link: "/teacher/lessonplan" },
        { name: "Time Table", icon: <FaTable />, link: "/teacher/timetable" },
        { name: "Event calender", icon: <FaCalendar />, link: "/teacher/event" },
        { name: "Chat and communication", icon: <FaComment />, link: "/teacher/chat" },

    ],

    parent: [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "Profile", icon: <FaUser />, link: "/parent_Profile" },
        { name: "Fees & Payments", icon: <FaMoneyBillWave />, link: "/fees" },
        { name: "Messages", icon: <FaComments />, link: "/chat" },
        { name: "Calendar & Events", icon: <FaCalendarAlt />, link: "/parentCalendar" },
        { name: "Time Tabale", icon: <FaTable />, link: "/parentTimetable" },

    ],

    principal: [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "Staff Management", icon: <FaUsers />, link: "/principal/staff" },
        { name: "Calendar", icon: <FaCalendarAlt />, link: "/principal/calendar" },
        { name: "Acadamic Progress", icon: <FaCalendarAlt />, link: "/principal/academic" },
        { name: "Reports", icon: <FaChartBar />, link: "/principal/analytics" },
        { name: "Profile", icon: <FaUserCog />, link: "/principal/profile" },
    ],
}; 