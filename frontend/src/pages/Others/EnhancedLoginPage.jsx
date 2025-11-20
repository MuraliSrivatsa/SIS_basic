import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Shield,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  Brain
} from "lucide-react"
import { toast } from "sonner@2.0.3"

export function EnhancedLoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    { icon: GraduationCap, title: "Academic Excellence", description: "Track student progress with comprehensive analytics" },
    { icon: Brain, title: "AI-Powered Insights", description: "Get personalized recommendations for every user" },
    { icon: Users, title: "Community Collaboration", description: "Connect students, teachers, and parents seamlessly" },
    { icon: Award, title: "Achievement Tracking", description: "Monitor and celebrate academic milestones" }
  ]

  const stats = [
    { label: "Active Students", value: "2,847" },
    { label: "Faculty Members", value: "156" },
    { label: "Courses", value: "89" },
    { label: "Success Rate", value: "94%" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !role) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const userData = {
      email,
      name: getNameFromRole(role),
      role,
      studentId: role === 'student' ? 'STU001' : undefined,
      teacherId: role === 'teacher' ? 'TEA001' : undefined,
      parentId: role === 'parent' ? 'PAR001' : undefined,
      principalId: role === 'principal' ? 'PRI001' : undefined,
      adminId: role === 'admin' ? 'ADM001' : undefined,
      administrationId: role === 'administration' ? 'ADS001' : undefined,
    }

    toast.success(`Welcome to ZENDESK, ${userData.name}!`)
    onLogin(userData)
    setIsLoading(false)
  }

  const getNameFromRole = (role) => {
    const names = {
      student: "Alex Johnson",
      teacher: "Dr. Sarah Smith",
      parent: "Michael Johnson",
      principal: "Dr. Margaret Wilson",
      admin: "System Administrator",
      administration: "Jane Administrative"
    }
    return names[role] || "User"
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  }
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  const currentFeatureData = features[currentFeature]
  const CurrentIcon = currentFeatureData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex">
      {/* Left branding/features */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ZENDESK</h1>
              <p className="text-white/80 text-sm font-medium">Education Management Platform</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentFeature} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <CurrentIcon className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentFeatureData.title}</h2>
                  <p className="text-white/80">{currentFeatureData.description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2 mb-8">
            {features.map((_, index) => (
              <div key={index} className={`h-2 rounded-full transition-all ${index === currentFeature ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5" />Platform Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right side - login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md">
          <div className="shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-8">
            <div className="text-center space-y-4 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600">Sign in to access your ZENDESK portal</p>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700"><Sparkles className="h-3 w-3" />AI Enhanced Platform</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Your Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full h-12 border-2 border-gray-200 rounded-lg px-3 bg-white/50">
                  <option value="">Choose your role...</option>
                  <option value="student">🎓 Student</option>
                  <option value="teacher">📖 Teacher</option>
                  <option value="parent">👥 Parent</option>
                  <option value="principal">🏆 Principal</option>
                  <option value="admin">🛡️ Administrator</option>
                  <option value="administration">📅 Administration Staff</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..."
                    className="pl-10 w-full h-12 border-2 border-gray-200 rounded-lg bg-white/50" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password..."
                    className="pl-10 pr-10 w-full h-12 border-2 border-gray-200 rounded-lg bg-white/50" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium">
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" /> :
                  <div className="flex items-center justify-center gap-2">Sign In to ZENDESK <ArrowRight className="h-4 w-4" /></div>}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Demo credentials:</p>
              <p className="text-xs">Any email/password combination will work for demo</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-3">Quick Demo Access:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["student", "teacher", "parent", "principal"].map((demoRole) => (
                <button key={demoRole} onClick={() => { setRole(demoRole); setEmail(`${demoRole}@zendesk.edu`); setPassword("demo123") }}
                  className="px-3 py-1 text-xs bg-white/80 border border-gray-200 rounded-full capitalize shadow-sm">
                  {demoRole}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}