import { useState } from "react"
import { motion } from "motion/react"
import { 
  Users, 
  Search, 
  UserCheck, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  RefreshCw,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  TrendingUp
} from "lucide-react"
import { toast } from "sonner@2.0.3"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const users = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@zendesk.edu',
      phone: '+1 (555) 123-4567',
      role: 'student',
      status: 'active',
      joinDate: '2023-09-01',
      lastLogin: '2024-10-20T14:30:00Z',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      address: '123 Student St, College Town, CT 06511',
      loginCount: 245,
      totalHours: 1850,
      grade: 'Grade 10',
      studentId: 'STU001'
    },
    {
      id: '2',
      name: 'Dr. Sarah Smith',
      email: 'sarah.smith@zendesk.edu',
      phone: '+1 (555) 234-5678',
      role: 'teacher',
      status: 'active',
      joinDate: '2018-08-15',
      lastLogin: '2024-10-20T16:45:00Z',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616c52d7d6d?w=150&h=150&fit=crop&crop=face',
      address: '456 Faculty Ave, Education City, CT 06512',
      loginCount: 892,
      totalHours: 3200,
      department: 'Computer Science',
      employeeId: 'TEA001'
    }
  ]

  const getActiveUsers = () => users.filter(u => u.status === "active")
  const getInactiveUsers = () => users.filter(u => u.status === "inactive")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
      || user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesTab = activeTab === 'all' || (activeTab === 'active' && user.status === 'active') || (activeTab === 'inactive' && user.status === 'inactive')
    return matchesSearch && matchesRole && matchesStatus && matchesTab
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role) => {
    const colors = {
      student: 'bg-blue-100 text-blue-800',
      teacher: 'bg-purple-100 text-purple-800',
      parent: 'bg-green-100 text-green-800',
      admin: 'bg-red-100 text-red-800'
    }
    return colors[role] || 'bg-gray-100 text-gray-800'
  }

  return (
    <motion.div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <Users className="h-6 w-6" />
            User Management
          </h1>
          <p className="text-gray-500">Monitor and manage users</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 border rounded px-3 py-2 text-sm">
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full border rounded px-3 py-2"
          />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="parent">Parents</option>
          <option value="admin">Admins</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {["all", "active", "inactive"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Users
          </button>
        ))}
      </div>

      {/* User List */}
      <div className="grid gap-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="p-4 border rounded-lg hover:shadow transition">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <img src={user.profileImage} alt={user.name} className="h-16 w-16 rounded-full border" />
                <div>
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">{user.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(user.status)}`}>{user.status}</span>
                    <span className={`px-2 py-1 text-xs rounded ${getRoleColor(user.role)}`}>{user.role}</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Mail className="h-4 w-4" /> {user.email}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Phone className="h-4 w-4" /> {user.phone}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin className="h-4 w-4" /> {user.address}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-sm border rounded px-3 py-1 flex items-center gap-1"><Eye className="h-3 w-3" /> View</button>
                <button className="text-sm border rounded px-3 py-1 flex items-center gap-1"><Edit className="h-3 w-3" /> Edit</button>
                <button className="text-sm border rounded px-3 py-1 text-red-600 flex items-center gap-1"><Trash2 className="h-3 w-3" /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-2">No users found</h3>
          <p className="text-gray-500">Try adjusting filters</p>
        </div>
      )}
    </motion.div>
  )
}
