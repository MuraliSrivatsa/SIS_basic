import { useState } from "react"
import {
  Users,
  Shield,
  Monitor,
  LogOut,
  User,
  Server,
  HardDrive,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import AdminSidebar from "./Admin_Sidebar";
import Sidebar from "../../components/sidebars/Sidebar";


export default function AdminDashboard({ user, onLogout }) {
  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 1486,
    activeUsers: 1347,
    systemUptime: 99.9,
    serverLoad: 67,
    storageUsed: 73,
    memoryUsage: 82,
    networkTraffic: 456,
  }

  const systemAlerts = [
    { type: "warning", message: "High memory usage on Server 2", severity: "medium", time: "2 minutes ago" },
    { type: "info", message: "Database backup completed successfully", severity: "low", time: "1 hour ago" },
    { type: "error", message: "Failed login attempts from suspicious IP", severity: "high", time: "3 hours ago" },
    { type: "warning", message: "SSL certificate expires in 30 days", severity: "medium", time: "1 day ago" },
  ]

  const userActivity = [
    { action: "Student registration", user: "john.smith@university.edu", time: "5 minutes ago", status: "success" },
    { action: "Teacher profile update", user: "dr.smith@university.edu", time: "12 minutes ago", status: "success" },
    { action: "Failed login attempt", user: "unknown@example.com", time: "23 minutes ago", status: "failed" },
    { action: "Grade submission", user: "prof.johnson@university.edu", time: "34 minutes ago", status: "success" },
    { action: "Parent account creation", user: "parent.brown@email.com", time: "45 minutes ago", status: "success" },
  ]

  const systemHealth = [
    { component: "Authentication Service", status: "healthy", uptime: 99.9, lastCheck: "1 min ago" },
    { component: "Database Cluster", status: "healthy", uptime: 99.8, lastCheck: "1 min ago" },
    { component: "File Storage", status: "warning", uptime: 97.2, lastCheck: "2 min ago" },
    { component: "Email Service", status: "healthy", uptime: 99.5, lastCheck: "1 min ago" },
    { component: "Backup System", status: "healthy", uptime: 98.9, lastCheck: "5 min ago" },
  ]

  const recentTasks = [
    { task: "System security audit", status: "completed", completedAt: "2024-08-18", priority: "high" },
    { task: "Database optimization", status: "in-progress", startedAt: "2024-08-19", priority: "medium" },
    { task: "User permission review", status: "pending", scheduledFor: "2024-08-21", priority: "high" },
    { task: "Server maintenance", status: "scheduled", scheduledFor: "2024-08-25", priority: "low" },
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const styles = {
      healthy: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
      success: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-800",
      scheduled: "bg-gray-100 text-gray-800",
    }
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-800"}`}>{status}</span>
  }

  const criticalAlerts = systemAlerts.filter((alert) => alert.severity === "high").length

  return (
    <div className="flex">
      <Sidebar role={"admin"}/>
      <div className="container space-y-6 p-6">
        {/* Header */}
        

        {/* Profile */}
        <div className="border rounded-lg bg-gradient-to-r from-red-50 to-orange-50 p-6 shadow">
          <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Shield className="h-5 w-5 text-red-600" /> Administrator Profile
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Admin ID</p>
              <p className="font-medium">{user.adminId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Access Level</p>
              <p className="font-medium">System Administrator</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Users" value={systemStats.totalUsers} subtitle={`${systemStats.activeUsers} active`} icon={<Users className="h-4 w-4 text-blue-600" />} />
          <StatCard title="System Uptime" value={`${systemStats.systemUptime}%`} subtitle="Last 30 days" icon={<Server className="h-4 w-4 text-green-600" />} />
          <StatCard title="Server Load" value={`${systemStats.serverLoad}%`} subtitle="Current load" icon={<Cpu className="h-4 w-4 text-orange-500" />} />
          <StatCard title="Storage Used" value={`${systemStats.storageUsed}%`} subtitle="of 2TB capacity" icon={<HardDrive className="h-4 w-4 text-purple-600" />} />
        </div>

        {/* Critical Alerts */}
        {criticalAlerts > 0 && (
          <div className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-md text-red-700">
            <AlertTriangle className="h-4 w-4" />
            {criticalAlerts} critical system alerts require immediate attention.
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Alerts */}
          <div className="border rounded-lg p-6 shadow">
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <AlertTriangle className="h-5 w-5" /> System Alerts
            </h2>
            <div className="space-y-4">
              {systemAlerts.map((alert, idx) => (
                <div key={idx} className={`p-3 border rounded-lg ${alert.severity === "high" ? "bg-red-50 border-red-200" : alert.severity === "medium" ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}`}>
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <p className="font-medium">{alert.message}</p>
                      <div className="flex items-center gap-2 text-xs mt-1 text-gray-600">
                        {getStatusBadge(alert.severity)}
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="border rounded-lg p-6 shadow">
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <Monitor className="h-5 w-5" /> System Health
            </h2>
            <div className="space-y-4">
              {systemHealth.map((comp, idx) => (
                <div key={idx} className="p-3 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium">{comp.component}</p>
                    {getStatusBadge(comp.status)}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Uptime: {comp.uptime}%</span>
                    <span>Last check: {comp.lastCheck}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-200 rounded mt-2">
                    <div className="h-1 bg-green-500 rounded" style={{ width: `${comp.uptime}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent User Activity */}
        <div className="border rounded-lg p-6 shadow">
          <h2 className="flex items-center gap-2 font-semibold mb-4">
            <Activity className="h-5 w-5" /> Recent User Activity
          </h2>
          <div className="space-y-3">
            {userActivity.map((a, idx) => (
              <div key={idx} className="flex justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{a.action}</p>
                  <p className="text-xs text-gray-500">{a.user}</p>
                </div>
                <div className="text-right">
                  {getStatusBadge(a.status)}
                  <p className="text-xs text-gray-500">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="border rounded-lg p-6 shadow">
          <h2 className="flex items-center gap-2 font-semibold mb-4">
            <CheckCircle className="h-5 w-5" /> Administrative Tasks
          </h2>
          <div className="space-y-3">
            {recentTasks.map((task, idx) => (
              <div key={idx} className="flex justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{task.task}</p>
                  <p className="text-xs text-gray-500">
                    {task.status === "completed" && `Completed: ${task.completedAt}`}
                    {task.status === "in-progress" && `Started: ${task.startedAt}`}
                    {(task.status === "pending" || task.status === "scheduled") && `Scheduled: ${task.scheduledFor}`}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(task.status)}
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${task.priority === "high" ? "bg-red-100 text-red-800" : task.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="border rounded-lg p-6 shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}
