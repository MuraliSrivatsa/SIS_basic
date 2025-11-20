import { useState } from "react"
import { GraduationCap, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export function RegisterPage({ onRegister, onShowLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    program: "",
    phoneNumber: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const programs = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Business Administration",
    "Psychology",
    "English Literature",
    "History"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    const existingEmails = [
      "john.smith@university.edu",
      "sarah.johnson@university.edu",
      "michael.brown@university.edu",
      "emily.davis@university.edu"
    ]

    if (existingEmails.includes(formData.email.toLowerCase())) {
      setError("An account with this email already exists")
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    const studentId = `STU${String(Math.floor(Math.random() * 9000) + 1000)}`
    const fullName = `${formData.firstName} ${formData.lastName}`

    toast.success(`Welcome to the university, ${fullName}! Your student ID is ${studentId}`)

    onRegister({
      email: formData.email,
      name: fullName,
      studentId: studentId
    })

    setIsLoading(false)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Create Student Account</h2>
          <p className="text-gray-600">Register as a new student to access the university portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Smith"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">University Email</label>
            <input
              id="email"
              type="email"
              placeholder="john.smith@university.edu"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="program" className="block text-sm font-medium text-gray-700">Program</label>
            <select
              id="program"
              value={formData.program}
              onChange={(e) => handleInputChange("program", e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select your program</option>
              {programs.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md border border-red-300">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onShowLogin}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )
}
