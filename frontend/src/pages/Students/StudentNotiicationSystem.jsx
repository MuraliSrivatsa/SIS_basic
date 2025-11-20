import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Bell,
  Plus,
  Send,
  AlertTriangle,
  Info,
  CheckCircle,
  Search,
} from "lucide-react"
import Sidebar from "./Student_Sidebar"

export function NotificationSystem({
  userRole,
  userId,
  userName,
  canSendNotifications = false,
}) {
  const [notifications, setNotifications] = useState([])
  const [isCreating, setIsCreating] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    priority: "medium",
    targetAudience: "all",
  })

  useEffect(() => {
    const mockNotifications = [
      {
        id: "1",
        title: "Important: Exam Schedule Updated",
        message:
          "The midterm examination schedule has been updated. Please check your timetable for the latest timings.",
        type: "urgent",
        priority: "urgent",
        senderId: "ADMIN001",
        senderName: "System Administrator",
        senderRole: "admin",
        targetAudience: "students",
        createdAt: "2024-10-20T10:30:00Z",
        readCount: 1250,
        totalRecipients: 2847,
        isActive: true,
      },
      {
        id: "2",
        title: "Faculty Meeting Tomorrow",
        message:
          "Reminder: Faculty meeting scheduled for tomorrow at 2:00 PM in the main conference room.",
        type: "info",
        priority: "medium",
        senderId: "TEA001",
        senderName: "Dr. Sarah Smith",
        senderRole: "teacher",
        targetAudience: "teachers",
        createdAt: "2024-10-20T08:15:00Z",
        readCount: 142,
        totalRecipients: 156,
        isActive: true,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const handleCreateNotification = () => {
    const notification = {
      id: Date.now().toString(),
      ...newNotification,
      senderId: userId,
      senderName: userName,
      senderRole: userRole,
      createdAt: new Date().toISOString(),
      readCount: 0,
      totalRecipients: getTotalRecipients(newNotification.targetAudience),
      isActive: true,
    }
    setNotifications((prev) => [notification, ...prev])
    setIsCreating(false)
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      priority: "medium",
      targetAudience: "all",
    })
  }

  const getTotalRecipients = (audience) => {
    const counts = {
      all: 4200,
      students: 2847,
      teachers: 156,
      parents: 1200,
      staff: 89,
    }
    return counts[audience] || 0
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "urgent":
        return AlertTriangle
      case "success":
        return CheckCircle
      default:
        return Info
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "urgent":
        return "text-red-600 bg-red-100"
      case "success":
        return "text-green-600 bg-green-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredNotifications = notifications
    .filter((n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="flex">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container space-y-6 p-4"
      >
        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border pl-8 pr-3 py-2 text-sm"
            />
          </div>
          {canSendNotifications && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md"
            >
              <Plus className="h-4 w-4" /> New
            </button>
          )}
        </div>

        {/* Notifications list */}
        <div className="space-y-4">
          {filteredNotifications.map((n) => {
            const Icon = getTypeIcon(n.type)
            return (
              <div
                key={n.id}
                className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-2 rounded-full ${getTypeColor(n.type)}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="font-semibold text-gray-800">{n.title}</h3>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(n.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{n.message}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>From: {n.senderName} ({n.senderRole})</span>
                  <span>
                    {n.readCount}/{n.totalRecipients} read
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Create Notification Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg space-y-4">
              <h2 className="text-lg font-semibold">Create Notification</h2>
              <input
                type="text"
                placeholder="Title"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, title: e.target.value })
                }
                className="w-full border rounded-md p-2 text-sm"
              />
              <textarea
                placeholder="Message"
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({ ...newNotification, message: e.target.value })
                }
                className="w-full border rounded-md p-2 text-sm"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-md border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  <Send className="h-4 w-4 inline mr-1" /> Send
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
