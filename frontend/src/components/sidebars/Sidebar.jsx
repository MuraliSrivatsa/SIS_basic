// Sidebar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarMenu } from "./SidebarConfig";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ role }) => {
    const menuItems = SidebarMenu[role] || [];
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`${isOpen ? "min-w-64" : "w-20"
                } bg-white border-r sticky top-0 left-0 duration-300 shadow-xl flex flex-col justify-between`}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -right-3 top-4 bg-gray-700 text-white rounded-full p-2 shadow-md hover:bg-gray-900 transition"
            >
                <FaBars size={16} />
            </button>

            {/* Navigation */}
            <nav className="flex flex-col mt-12 flex-1 space-y-1">
                {menuItems.map((item, idx) => {
                    const isActive = location.pathname === item.link;

                    return (
                        <div
                            key={idx}
                            onClick={() => navigate(item.link)}
                            className={`group relative flex items-center cursor-pointer rounded-md mx-2 my-2 overflow-hidden
                ${isOpen ? "gap-3 px-4 py-3" : "justify-center py-3"} 
                ${isActive ? "text-white font-semibold" : "text-gray-700"}
              `}
                        >
                            {/* Left-to-right animation background */}
                            <span
                                className={`absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-gray-800 to-gray-700 transition-all duration-500 ease-in-out text-white
                  ${isActive ? "w-full " : "group-hover:w-full "}
                `}
                            > </span>

                            {/* Icon + Text (stay above background) */}
                            <span className={`relative z-10 text-lg ${isActive ? "text-white" : "group-hover:text-white"}`}>{item.icon}</span>
                            {isOpen && (
                                <span
                                    className={`relative z-10 text-sm font-medium  ${isActive ? "text-white" : "group-hover:text-white"}`}>
                                    {item.name}
                                </span>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
