import { useState } from "react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Edit3,
  Save,
  X,
  Camera,
  UserCircle,
  Briefcase
} from "lucide-react"
import PrincipalSidebar from "./PrincipalSideBar"
import Sidebar from "../../components/sidebars/Sidebar"

export default function PrincipalProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    firstName: user?.name?.split(" ")[0] || "Alex",
    lastName: user?.name?.split(" ")[1] || "Johnson",
    email: user?.email || "principal@example.com",
    phone: "+91 98765 43210",
    address: "Green Valley International School, Bangalore, India",
    dateOfBirth: "1975-08-20",
    designation: "Principal",
    department: "School Administration",
    experience: "20+ years in Education",
    officeHours: "Mon - Fri, 9 AM - 4 PM",
    qualifications: "Ph.D. in Educational Leadership, M.Ed.",
    achievements: "Recipient of National Best Educator Award (2022)",
    bio: "Dedicated principal with a passion for academic excellence, student success, and teacher empowerment."
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
      <Sidebar role={"principal"}/>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Principal Profile</h1>
            <p className="text-gray-500">Manage your professional details</p>
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
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-gray-500">{profileData.designation}</p>
                <span className="mt-2 inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {profileData.department}
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
                    <Calendar className="h-4 w-4" />{" "}
                    {new Date(profileData.dateOfBirth).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <Briefcase className="h-5 w-5" /> Professional Information
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Designation</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.designation}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.department}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.experience}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Office Hours</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.officeHours}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.qualifications}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Achievements</label>
              <div className="p-3 bg-gray-100 rounded-lg">{profileData.achievements}</div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
            <BookOpen className="h-5 w-5" /> Biography / Vision
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
