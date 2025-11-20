import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUser,
    FaBook,
    FaTasks,
    FaBell,
    FaCalendarAlt,
    FaComments,
    FaRobot,
    FaBars,
    FaSignOutAlt,
} from "react-icons/fa";
export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
        { name: "Profile", icon: <FaUser />, link: "/student_Profile" },
        { name: "My Courses", icon: <FaBook />, link: "/student_course" },
        { name: "Assignments", icon: <FaTasks />, link: "/stud_assignment" },
        { name: "Notifications", icon: <FaBell />, link: "/student_notification" },
        { name: "Timetable", icon: <FaCalendarAlt />, link: "/timetable" },
        { name: "Chat & Comms", icon: <FaComments />, link: "/student_Chat" },
        { name: "AI Recommendation", icon: <FaRobot />, link: "/ai-recommendation" },
        { name: "Calendar & Events", icon: <FaCalendarAlt />, link: "/studentCalendar" },
    ];



    return (
        <div
            className={`${isOpen ? "w-64" : "w-20"
                } bg-white border-r h-screen sticky top-0 left-0 duration-300 shadow-md flex flex-col justify-between`}
        >
            {/* Top Section */}
            <div>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute -right-3 top-4 bg-gray-600 text-white rounded-full p-2 shadow-md hover:bg-gray-900"
                >
                    <FaBars size={16} />
                </button>

                {/* Navigation */}
                <nav className="flex flex-col mt-6 flex-1">
                    {menuItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.link}
                            className={`flex items-center ${isOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                                } text-gray-700 hover:bg-gray-800 hover:text-white transition text-decoration-none rounded-md mx-2`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {isOpen && <span className="text-sm font-medium">{item.name}</span>}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}
