import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Plus,
  Send,
  AlertTriangle,
  Info,
  CheckCircle,
  Megaphone,
  Clock,
  Users,
  Eye,
  Trash2,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "./Admin_Sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

export default function AdminNotificationSystem({
  userRole,
  userId,
  userName,
  canSendNotifications = true,
}) {
  const [notifications, setNotifications] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    priority: "medium",
    targetAudience: "all",
  });

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    setNotifications([
      {
        id: "1",
        title: "Important: Exam Schedule Updated",
        message:
          "The midterm examination schedule has been updated. Please check your timetable for the latest timings. All students are advised to prepare accordingly.",
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
    ]);
  }, []);

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
    };
    setNotifications((prev) => [notification, ...prev]);
    setIsCreating(false);
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      priority: "medium",
      targetAudience: "all",
    });
    toast.success("Notification sent successfully!");
  };

  const getTotalRecipients = (audience) => {
    const counts = {
      all: 4200,
      students: 2847,
      teachers: 156,
      parents: 1200,
      staff: 89,
    };
    return counts[audience] || 0;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "urgent":
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50 text-red-600";
      case "warning":
        return "border-orange-200 bg-orange-50 text-orange-600";
      case "success":
        return "border-green-200 bg-green-50 text-green-600";
      default:
        return "border-blue-200 bg-blue-50 text-blue-600";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredNotifications = notifications
    .filter((n) => {
      if (!canSendNotifications && userRole === "student") {
        return n.targetAudience === "all" || n.targetAudience === "students";
      }
      if (!canSendNotifications && userRole === "parent") {
        return n.targetAudience === "all" || n.targetAudience === "parents";
      }
      return true;
    })
    .filter((n) => {
      if (filter === "urgent") return n.priority === "urgent";
      if (filter === "unread") return Math.random() > 0.7;
      return true;
    })
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex">
      <Sidebar role={"admin"}/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-bold">
              <Bell className="h-6 w-6" />
              {canSendNotifications
                ? "Notification Center"
                : "Important Announcements"}
            </h1>
            <p className="text-gray-500">
              {canSendNotifications
                ? "Send announcements to students, teachers, and parents"
                : "Stay updated with school announcements"}
            </p>
          </div>
          {canSendNotifications && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Create Announcement
            </button>
          )}
        </div>

        {/* Create Modal */}
        {isCreating && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg">
              <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <Megaphone className="h-5 w-5" />
                Create New Announcement
              </h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <textarea
                  placeholder="Message..."
                  rows={3}
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({
                      ...newNotification,
                      message: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={newNotification.type}
                    onChange={(e) =>
                      setNewNotification({ ...newNotification, type: e.target.value })
                    }
                    className="border px-2 py-2 rounded-lg"
                  >
                    <option value="info">Information</option>
                    <option value="warning">Warning</option>
                    <option value="urgent">Urgent</option>
                    <option value="success">Success</option>
                  </select>
                  <select
                    value={newNotification.priority}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        priority: e.target.value,
                      })
                    }
                    className="border px-2 py-2 rounded-lg"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <select
                    value={newNotification.targetAudience}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        targetAudience: e.target.value,
                      })
                    }
                    className="border px-2 py-2 rounded-lg"
                  >
                    <option value="all">Everyone</option>
                    <option value="students">Students</option>
                    <option value="teachers">Teachers</option>
                    <option value="parents">Parents</option>
                    <option value="staff">Staff</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  <Send className="h-4 w-4 inline mr-1" />
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-2">
            {["all", "unread", "urgent"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-sm rounded-lg border ${filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-100"
                  }`}
              >
                {f === "all" && <Filter className="h-3 w-3 inline mr-1" />}
                {f === "urgent" && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                {f === "unread" && <Bell className="h-3 w-3 inline mr-1" />}
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredNotifications.map((n, i) => {
              const TypeIcon = getTypeIcon(n.type);
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div
                    className={`border rounded-lg p-4 shadow-sm ${getTypeColor(
                      n.type
                    )}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(
                            n.type
                          )}`}
                        >
                          <TypeIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            {n.title}
                            <span
                              className={`w-2 h-2 rounded-full ${getPriorityColor(
                                n.priority
                              )}`}
                            />
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <span>{n.senderName}</span>•
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(n.createdAt)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {n.targetAudience}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs ${n.priority === "urgent"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100"
                            }`}
                        >
                          {n.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{n.message}</p>
                    {canSendNotifications && (
                      <div className="flex justify-between mt-3 pt-3 border-t text-sm text-gray-500">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {n.readCount}/{n.totalRecipients} read
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {Math.round(
                              (n.readCount / n.totalRecipients) * 100
                            )}
                            % engagement
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 border rounded text-xs">
                            View
                          </button>
                          {canSendNotifications && (
                            <button
                              onClick={() => handleDelete(n.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          )}


                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3" />
            <p>No announcements found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
