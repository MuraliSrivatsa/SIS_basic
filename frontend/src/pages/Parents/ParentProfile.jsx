import { useState } from "react"
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Users,
    TrendingUp,
    Award,
    Calendar,
    Clock,
    BookOpen,
    Camera,
    Edit3,
    Save,
    X,
    GraduationCap,
    MapPinIcon
} from "lucide-react"
import ParentSidebar from "./Parent_sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function EnhancedParentProfile({ user }) {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedChild, setSelectedChild] = useState("1")
    const [activeTab, setActiveTab] = useState('profile')

    const [profileData, setProfileData] = useState({
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        firstName: user?.name?.split(' ')[0] || 'John',
        lastName: user?.name?.split(' ')[1] || 'Doe',
        email: user?.email || 'john.doe@example.com',
        phone: "+1 (555) 123-4567",
        address: "123 Family Ave, Suburban Town, CT 06511",
        emergencyContact: "+1 (555) 987-6543",
        occupation: "Software Engineer",
        employer: "Tech Solutions Inc."
    })

    const [children] = useState([
        {
            id: "1",
            name: "John Smith",
            grade: "Grade 10",
            class: "10-A",
            age: 16,
            gpa: 3.7,
            attendance: 94,
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            school: "Lincoln High School",
            address: "123 School District Ave, Education City, CT 06512",
            subjects: [
                { name: "Mathematics", grade: "A-", score: 87 },
                { name: "Physics", grade: "B+", score: 85 },
                { name: "Chemistry", grade: "A", score: 92 },
                { name: "English", grade: "B", score: 82 },
                { name: "History", grade: "A-", score: 88 }
            ],
            recentExams: [
                { name: "Math Midterm", score: 89, date: "2024-10-15" },
                { name: "Physics Test", score: 87, date: "2024-10-12" },
                { name: "Chemistry Quiz", score: 94, date: "2024-10-10" }
            ],
            activities: ["Chess Club", "Science Olympiad", "Basketball Team"]
        },
        {
            id: "2",
            name: "Emma Smith",
            grade: "Grade 8",
            class: "8-B",
            age: 14,
            gpa: 3.9,
            attendance: 96,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616c52d7d6d?w=150&h=150&fit=crop&crop=face",
            school: "Roosevelt Middle School",
            address: "456 Education Blvd, Learning District, CT 06513",
            subjects: [
                { name: "Mathematics", grade: "A", score: 94 },
                { name: "Science", grade: "A+", score: 98 },
                { name: "English", grade: "A-", score: 89 },
                { name: "Social Studies", grade: "A", score: 92 },
                { name: "Art", grade: "A+", score: 97 }
            ],
            recentExams: [
                { name: "Science Project", score: 96, date: "2024-10-14" },
                { name: "Math Test", score: 91, date: "2024-10-11" },
                { name: "English Essay", score: 88, date: "2024-10-08" }
            ],
            activities: ["Drama Club", "Robotics Team", "Art Society"]
        }
    ])

    const currentChild = children.find(child => child.id === selectedChild) || children[0]

    const handleSave = () => {
        alert("Profile updated successfully!")
        setIsEditing(false)
    }

    const handleImageUpload = () => {
        alert("Image upload functionality would be implemented here")
    }

    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'text-green-600 bg-green-100'
        if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100'
        if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100'
        return 'text-red-600 bg-red-100'
    }

    const tabVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    }

    return (
        <div className="flex">
            <Sidebar role={"parent"}/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container space-y-6 p-6 max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl font-bold text-gray-900"
                        >
                            Parent Profile
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 mt-1"
                        >
                            Manage your profile and monitor your children's academic progress
                        </motion.p>
                    </div>
                    {!isEditing ? (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </button>
                        </motion.div>
                    ) : (
                        <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </button>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-6 pb-3">
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                                {[
                                    { id: 'profile', label: 'My Profile', icon: User },
                                    { id: 'children', label: 'My Children', icon: Users },
                                    { id: 'analytics', label: 'Academic Progress', icon: TrendingUp }
                                ].map((tab) => (
                                    <motion.button
                                        key={tab.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-white text-blue-600 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        <tab.icon className="h-4 w-4" />
                                        {tab.label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {activeTab === 'profile' && (
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Profile Picture */}
                            <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="p-6 pb-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <User className="h-5 w-5" />
                                        Profile Picture
                                    </h3>
                                </div>
                                <div className="px-6 pb-6">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="relative">
                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <div className="h-32 w-32 rounded-full border-4 border-gray-200 overflow-hidden">
                                                    <img
                                                        src={profileData.profileImage}
                                                        alt={`${profileData.firstName} ${profileData.lastName}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </motion.div>
                                            {isEditing && (
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={handleImageUpload}
                                                    className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full h-8 w-8 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <Camera className="h-4 w-4" />
                                                </motion.button>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-xl font-semibold text-gray-900">{profileData.firstName} {profileData.lastName}</h3>
                                            <p className="text-gray-600">Parent</p>
                                            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                                {children.length} Children
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="p-6 pb-4">
                                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                        <User className="h-5 w-5" />
                                        Personal Information
                                    </h3>
                                </div>
                                <div className="px-6 pb-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">First Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.firstName}
                                                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="p-3 bg-gray-100 rounded-md text-gray-900">{profileData.firstName}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.lastName}
                                                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="p-3 bg-gray-100 rounded-md text-gray-900">{profileData.lastName}</div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                                            <div className="p-3 bg-gray-50 rounded-md text-gray-600 flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                {profileData.email}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.phone}
                                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="p-3 bg-gray-100 rounded-md flex items-center gap-2 text-gray-900">
                                                    <Phone className="h-4 w-4" />
                                                    {profileData.phone}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-medium text-gray-700">Home Address</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={profileData.address}
                                                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            ) : (
                                                <div className="p-3 bg-gray-100 rounded-md flex items-center gap-2 text-gray-900">
                                                    <MapPin className="h-4 w-4" />
                                                    {profileData.address}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Occupation</label>
                                            <div className="p-3 bg-gray-100 rounded-md text-gray-900">{profileData.occupation}</div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Employer</label>
                                            <div className="p-3 bg-gray-100 rounded-md text-gray-900">{profileData.employer}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'children' && (
                        <div className="space-y-6">
                            {/* Child Selection */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="p-6 pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Select Child</h3>
                                    <p className="text-gray-600">Choose which child's profile to view</p>
                                </div>
                                <div className="px-6 pb-6">
                                    <select
                                        value={selectedChild}
                                        onChange={(e) => setSelectedChild(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {children.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.name} - {child.grade}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Child Profile */}
                            <div className="grid gap-6 lg:grid-cols-3">
                                <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="p-6 pb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Child Profile</h3>
                                    </div>
                                    <div className="px-6 pb-6 space-y-4">
                                        <div className="text-center">
                                            <div className="h-24 w-24 rounded-full overflow-hidden mx-auto mb-4">
                                                <img
                                                    src={currentChild.profileImage}
                                                    alt={currentChild.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900">{currentChild.name}</h3>
                                            <p className="text-gray-600">{currentChild.grade} • Age {currentChild.age}</p>
                                            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                                {currentChild.class}
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700">GPA</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                                                    {currentChild.gpa}
                                                </span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-700">Attendance</span>
                                                    <span className="text-gray-900 font-medium">{currentChild.attendance}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${currentChild.attendance}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                                    <MapPinIcon className="h-3 w-3" />
                                                    School Location
                                                </p>
                                                <p className="text-xs text-gray-600">{currentChild.school}</p>
                                                <p className="text-xs text-gray-600">{currentChild.address}</p>
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-700">Activities</p>
                                                <div className="space-y-1">
                                                    {currentChild.activities.map((activity, index) => (
                                                        <span key={index} className="inline-block mr-1 mb-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                            {activity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="p-6 pb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
                                        <p className="text-gray-600">Current grades and scores across all subjects</p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <div className="space-y-4">
                                            {currentChild.subjects.map((subject, index) => (
                                                <motion.div
                                                    key={subject.name}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <BookOpen className="h-5 w-5 text-gray-600" />
                                                        <div>
                                                            <p className="font-medium text-gray-900">{subject.name}</p>
                                                            <p className="text-sm text-gray-600">Score: {subject.score}%</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(subject.grade)}`}>
                                                        {subject.grade}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Exams */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="p-6 pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Exam Results</h3>
                                    <p className="text-gray-600">Latest test and exam performances</p>
                                </div>
                                <div className="px-6 pb-6">
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {currentChild.recentExams.map((exam, index) => (
                                            <motion.div
                                                key={exam.name}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="p-4 border border-gray-200 rounded-lg"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium text-gray-900">{exam.name}</h4>
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                                        {exam.score}%
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(exam.date).toLocaleDateString()}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            {/* Child Selection for Analytics */}
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                <div className="p-6 pb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Academic Analytics</h3>
                                    <p className="text-gray-600">Choose a child to view detailed academic analytics</p>
                                </div>
                                <div className="px-6 pb-6">
                                    <select
                                        value={selectedChild}
                                        onChange={(e) => setSelectedChild(e.target.value)}
                                        className="w-full max-w-xs p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {children.map((child) => (
                                            <option key={child.id} value={child.id}>
                                                {child.name} - {child.grade}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Performance Charts */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="p-6 pb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Subject Scores</h3>
                                        <p className="text-gray-600">{currentChild.name}'s performance across subjects</p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={currentChild.subjects}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="score" fill="#3b82f6" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                                    <div className="p-6 pb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Grade Distribution</h3>
                                        <p className="text-gray-600">Distribution of grades across subjects</p>
                                    </div>
                                    <div className="px-6 pb-6">
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={currentChild.subjects.map((subject, index) => ({
                                                        name: subject.name,
                                                        value: subject.score,
                                                        fill: COLORS[index % COLORS.length]
                                                    }))}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={100}
                                                    dataKey="value"
                                                    label={({ name, value }) => `${name}: ${value}%`}
                                                >
                                                    {currentChild.subjects.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="grid gap-4 md:grid-cols-4">
                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Overall GPA</p>
                                            <p className="text-2xl font-bold text-green-600">{currentChild.gpa}</p>
                                        </div>
                                        <GraduationCap className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Attendance</p>
                                            <p className="text-2xl font-bold text-blue-600">{currentChild.attendance}%</p>
                                        </div>
                                        <Clock className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Average Score</p>
                                            <p className="text-2xl font-bold text-purple-600">
                                                {Math.round(currentChild.subjects.reduce((acc, s) => acc + s.score, 0) / currentChild.subjects.length)}%
                                            </p>
                                        </div>
                                        <Award className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-600">Activities</p>
                                            <p className="text-2xl font-bold text-orange-600">{currentChild.activities.length}</p>
                                        </div>
                                        <Users className="h-8 w-8 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}