import { useState } from "react"
import { motion } from "motion/react"
import { 
  User, Mail, Phone, MapPin, GraduationCap, Edit3, Save, X, Camera,
  BookOpen, Award, Users, Clock, BarChart3, TrendingUp
} from "lucide-react"
import { toast } from "sonner"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'

export default function EnhancedTeacherProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    firstName: user.name.split(" ")[0] || "",
    lastName: user.name.split(" ")[1] || "",
    email: user.email,
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, College Town, CT 06511",
    dateOfBirth: "1985-03-15",
    emergencyContact: "+1 (555) 987-6543",
    department: "Computer Science",
    position: "Associate Professor",
    education: "PhD in Computer Science",
    yearsExperience: "8",
    specialization: "Artificial Intelligence and Machine Learning",
    bio: "Passionate educator with expertise in AI and ML, dedicated to inspiring the next generation of computer scientists."
  })

  const studentPerformanceData = [
    { name: 'CS 101', avgScore: 85, students: 45, passRate: 92 },
    { name: 'CS 201', avgScore: 78, students: 32, passRate: 87 },
    { name: 'CS 301', avgScore: 82, students: 28, passRate: 90 },
    { name: 'CS 401', avgScore: 88, students: 25, passRate: 96 }
  ]

  const examComparisonData = [
    { exam: 'Midterm 1', average: 82, highest: 95, lowest: 65 },
    { exam: 'Midterm 2', average: 78, highest: 92, lowest: 58 },
    { exam: 'Final Exam', average: 85, highest: 98, lowest: 70 },
    { exam: 'Project', average: 88, highest: 100, lowest: 75 }
  ]

  const monthlyProgressData = [
    { month: 'Sep', attendance: 95, performance: 82 },
    { month: 'Oct', attendance: 93, performance: 85 },
    { month: 'Nov', attendance: 96, performance: 87 },
    { month: 'Dec', attendance: 94, performance: 89 }
  ]

  const handleSave = () => {
    toast.success("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleCancel = () => setIsEditing(false)

  const handleImageUpload = () => {
    toast.info("Image upload functionality would be implemented here")
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Profile</h1>
          <p className="text-gray-500">Manage your profile and view teaching analytics</p>
        </div>
        {!isEditing ? (
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Edit3 className="h-4 w-4" /> Edit Profile
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg">
              <Save className="h-4 w-4" /> Save Changes
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 border rounded-lg">
              <X className="h-4 w-4" /> Cancel
            </motion.button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 rounded-lg p-1 flex space-x-2">
        {[{ id: 'profile', label: 'Personal Info', icon: User }, { id: 'analytics', label: 'Teaching Analytics', icon: BarChart3 }, { id: 'performance', label: 'Student Performance', icon: TrendingUp }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium ${activeTab === tab.id ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><User className="h-5 w-5" /> Profile Picture</h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img src={profileData.profileImage} alt={user.name} className="h-32 w-32 rounded-full object-cover border-4 border-gray-200" />
                {isEditing && (
                  <button onClick={handleImageUpload} className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-500">{profileData.position}</p>
                <span className="inline-block px-3 py-1 text-sm bg-gray-100 rounded mt-2">{profileData.department}</span>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><User className="h-5 w-5" /> Personal Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm">First Name</label>
                {isEditing ? <input className="w-full border rounded p-2" value={profileData.firstName} onChange={e => setProfileData({ ...profileData, firstName: e.target.value })} /> : <div className="p-2 bg-gray-100 rounded">{profileData.firstName}</div>}
              </div>
              <div>
                <label className="block text-sm">Last Name</label>
                {isEditing ? <input className="w-full border rounded p-2" value={profileData.lastName} onChange={e => setProfileData({ ...profileData, lastName: e.target.value })} /> : <div className="p-2 bg-gray-100 rounded">{profileData.lastName}</div>}
              </div>
              <div>
                <label className="block text-sm">Email</label>
                <div className="p-2 bg-gray-50 rounded flex items-center gap-2 text-gray-500"><Mail className="h-4 w-4" /> {profileData.email}</div>
              </div>
              <div>
                <label className="block text-sm">Phone</label>
                {isEditing ? <input className="w-full border rounded p-2" value={profileData.phone} onChange={e => setProfileData({ ...profileData, phone: e.target.value })} /> : <div className="p-2 bg-gray-100 rounded flex items-center gap-2"><Phone className="h-4 w-4" /> {profileData.phone}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm">Address</label>
                {isEditing ? <textarea className="w-full border rounded p-2" rows={2} value={profileData.address} onChange={e => setProfileData({ ...profileData, address: e.target.value })} /> : <div className="p-2 bg-gray-100 rounded flex items-start gap-2"><MapPin className="h-4 w-4 mt-1" /> {profileData.address}</div>}
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="lg:col-span-3 bg-white shadow rounded-lg p-6 space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Professional Information</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div><label className="block text-sm">Department</label><div className="p-2 bg-gray-100 rounded">{profileData.department}</div></div>
              <div><label className="block text-sm">Position</label><div className="p-2 bg-gray-100 rounded">{profileData.position}</div></div>
              <div><label className="block text-sm">Experience</label><div className="p-2 bg-gray-100 rounded">{profileData.yearsExperience} years</div></div>
              <div className="md:col-span-2"><label className="block text-sm">Education</label><div className="p-2 bg-gray-100 rounded">{profileData.education}</div></div>
              <div><label className="block text-sm">Specialization</label><div className="p-2 bg-gray-100 rounded">{profileData.specialization}</div></div>
              <div className="md:col-span-3"><label className="block text-sm">Biography</label>{isEditing ? <textarea className="w-full border rounded p-2" rows={3} value={profileData.bio} onChange={e => setProfileData({ ...profileData, bio: e.target.value })} /> : <div className="p-2 bg-gray-100 rounded">{profileData.bio}</div>}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { title: "Total Students", value: "130", change: "+12%", icon: Users },
              { title: "Average Score", value: "83.2", change: "+5.3%", icon: Award },
              { title: "Completion", value: "91%", change: "+2.1%", icon: BookOpen },
              { title: "Teaching Hours", value: "240", change: "+8%", icon: Clock }
            ].map((stat, i) => (
              <div key={stat.title} className="bg-white p-4 rounded-lg shadow flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
            ))}
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-2">Course Performance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#3b82f6" />
                <Bar dataKey="passRate" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-2">Exam Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={examComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="exam" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#8b5cf6" />
                <Bar dataKey="highest" fill="#10b981" />
                <Bar dataKey="lowest" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="font-semibold mb-2">Monthly Progress Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="performance" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </motion.div>
  )
}
