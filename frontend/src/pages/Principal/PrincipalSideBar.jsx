import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarAlt,
  FaChartBar,
  FaUserCog,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

export default function PrincipalSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, link: "/dashboard" },
    { name: "Staff Management", icon: <FaUsers />, link: "/principal/staff" },
    { name: "Calendar", icon: <FaCalendarAlt />, link: "/principal/calendar" },
    { name: "Acadamic Progress", icon: <FaCalendarAlt />, link: "/principal/academic" },
    { name: "Reports", icon: <FaChartBar />, link: "/principal/analytics" },
    { name: "Profile", icon: <FaUserCog />, link: "/principal/profile" },
  ];



  return (
    <div
      className={`${isOpen ? "w-64" : "w-20"}
      bg-white dark:bg-gray-900 border-r h-screen sticky top-0 left-0 
      duration-300 shadow-md flex flex-col justify-between`}
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

        {/* Sidebar Header */}
        

        {/* Navigation */}
        <nav className="flex flex-col mt-6 flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className={`flex items-center ${
                isOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
              } text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white transition 
              rounded-md mx-2 no-underline`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        
      </div>
    </div>
  );
}
