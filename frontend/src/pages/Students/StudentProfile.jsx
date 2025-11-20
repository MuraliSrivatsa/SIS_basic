import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  GraduationCap,
  Edit3,
  Save,
  X,
  Camera,
  UserCircle
} from "lucide-react"
import Sidebar from "./Student_Sidebar"

export default function StudentProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    firstName: user?.name?.split(" ")[0] || "John",
    lastName: user?.name?.split(" ")[1] || "Doe",
    email: user?.email || "johndoe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, College Town, CT 06511",
    dateOfBirth: "1999-05-15",
    emergencyContact: "+1 (555) 987-6543",
    emergencyContactName: "John Smith Sr.",
    major: "Computer Science",
    year: "Junior",
    semester: "Fall 2024",
    gpa: "3.7",
    expectedGraduation: "May 2025",
    advisor: "Dr. Robert Smith",
    bio: "Passionate computer science student with interests in AI and software development."
  })

  const handleSave = () => {
    alert("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value })
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className=" container mx-auto p-6 space-y-6 ">
        {/* Sidebar */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Student Profile</h1>
            <p className="text-gray-500">Manage your personal and academic details</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
              <UserCircle className="h-5 w-5" /> Profile Picture
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover"
                />
                {isEditing && (
                  <button
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-500">{profileData.major} Student</p>
                <span className="mt-2 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {profileData.year} - {profileData.semester}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
              <User className="h-5 w-5" /> Personal Information
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                {isEditing ? (
                  <input
                    value={profileData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-lg">{profileData.firstName}</div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                {isEditing ? (
                  <input
                    value={profileData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <div className="p-3 bg-gray-100 rounded-lg">{profileData.lastName}</div>
                )}
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg text-gray-600">
                  <Mail className="h-4 w-4" /> {profileData.email}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                {isEditing ? (
                  <input
                    value={profileData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                    <Phone className="h-4 w-4" /> {profileData.phone}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={2}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <div className="flex items-start gap-2 p-3 bg-gray-100 rounded-lg">
                    <MapPin className="h-4 w-4 mt-1" /> {profileData.address}
                  </div>
                )}
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                    <Calendar className="h-4 w-4" /> {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <GraduationCap className="h-5 w-5" /> Academic Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Major</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.major}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.year}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">GPA</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.gpa} / 4.0</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Graduation</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.expectedGraduation}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Advisor</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.advisor}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <BookOpen className="h-5 w-5" /> Biography
          </h2>
          {isEditing ? (
            <textarea
              value={profileData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
            />
          ) : (
            <div className="p-3 bg-gray-100 rounded-lg">{profileData.bio}</div>
          )}
        </div>
      </div>
    </div>
  )
}
