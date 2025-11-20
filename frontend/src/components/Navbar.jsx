import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";


export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo / Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-900 dark:text-white font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">ZENDESK <span className="text-sm font-bold text-slate-900">By ITS Phoneix</span></span>
          </div>
        </motion.h1>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaUserCircle className="text-gray-600 dark:text-gray-300 text-3xl" />
            <span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium">
              {user?.username || "User"}{" "}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({user?.user_type})
              </span>
            </span>
          </button>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-800/95 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/*<a
                href="#"
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
              >
                <FaCog className="text-gray-500 dark:text-gray-400" /> Settings
              </a>*/}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
