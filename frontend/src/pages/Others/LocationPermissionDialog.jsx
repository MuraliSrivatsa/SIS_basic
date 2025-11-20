import { useState } from "react"
import { motion } from "motion/react"
import { 
  MapPin, 
  Shield, 
  Clock, 
  Bus, 
  CheckCircle, 
  XCircle, 
  Lock,
  Smartphone,
  Eye
} from "lucide-react"
import { toast } from "sonner@2.0.3"

export function LocationPermissionDialog({ 
  isOpen, 
  onClose, 
  onPermissionGranted, 
  userRole, 
  userName 
}) {
  const [permissionStatus, setPermissionStatus] = useState("pending")
  const [isRequesting, setIsRequesting] = useState(false)

  const handleRequestPermission = async () => {
    setIsRequesting(true)
    try {
      if ("geolocation" in navigator) {
        if ("permissions" in navigator) {
          const permission = await navigator.permissions.query({ name: "geolocation" })
          if (permission.state === "granted") {
            setPermissionStatus("granted")
            onPermissionGranted(true)
            toast.success("Location access granted! Bus tracking is now enabled.")
          } else if (permission.state === "denied") {
            setPermissionStatus("denied")
            onPermissionGranted(false)
            toast.error("Location access denied. Bus tracking will not be available.")
          } else {
            navigator.geolocation.getCurrentPosition(
              () => {
                setPermissionStatus("granted")
                onPermissionGranted(true)
                toast.success("Location access granted! Bus tracking is now enabled.")
              },
              () => {
                setPermissionStatus("denied")
                onPermissionGranted(false)
                toast.error("Location access denied. Bus tracking will not be available.")
              }
            )
          }
        }
      } else {
        setPermissionStatus("denied")
        onPermissionGranted(false)
        toast.error("Geolocation is not supported by this browser.")
      }
    } catch (error) {
      console.error("Error requesting location permission:", error)
      setPermissionStatus("denied")
      onPermissionGranted(false)
      toast.error("Error requesting location access.")
    }
    setIsRequesting(false)
  }

  const handleDeny = () => {
    setPermissionStatus("denied")
    onPermissionGranted(false)
    toast.info("You can enable location access later in the Bus Tracking section.")
    onClose()
  }

  const benefits = [
    { icon: Bus, title: "Real-time Bus Tracking", description: "See exactly where your child's bus is at any moment" },
    { icon: Clock, title: "Accurate Arrival Times", description: "Get precise pickup and drop-off time estimates" },
    { icon: Shield, title: "Enhanced Safety", description: "Monitor your child's journey for peace of mind" }
  ]

  const privacyPoints = [
    "Location data is only used for bus tracking features",
    "Your location is not stored permanently on our servers",
    "You can revoke this permission at any time",
    "Location data is encrypted and secure"
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Enable Location Access</h2>
        </div>
        <p className="text-gray-600 mb-6">
          ZENDESK would like to access your location for enhanced bus tracking features.
        </p>

        {/* Benefits */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600" /> Why We Need Location Access
          </h3>
          <div className="space-y-3">
            {benefits.map((b, idx) => (
              <motion.div key={b.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <div className="border-l-4 border-blue-500 bg-white rounded shadow-sm p-4 flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <b.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{b.title}</h4>
                    <p className="text-sm text-gray-600">{b.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-6">
          <h3 className="flex items-center gap-2 font-semibold text-gray-800 mb-3">
            <Lock className="h-5 w-5 text-green-600" /> Your Privacy is Protected
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <ul className="space-y-2 text-sm text-green-800">
              {privacyPoints.map((point, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex gap-2">
                  <Shield className="h-4 w-4 flex-shrink-0 text-green-600" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-blue-900">{userName} • {userRole}</p>
            <p className="text-sm text-blue-700">Requesting location access for bus tracking features</p>
          </div>
        </div>

        {/* Status */}
        {permissionStatus === "granted" && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Location Access Granted!</p>
              <p className="text-sm text-green-700">Bus tracking features are now available.</p>
            </div>
          </div>
        )}
        {permissionStatus === "denied" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <XCircle className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Location Access Denied</p>
              <p className="text-sm text-red-700">You can enable this later in settings.</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {permissionStatus === "pending" ? (
          <div className="flex gap-3">
            <button
              onClick={handleRequestPermission}
              disabled={isRequesting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {isRequesting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : <MapPin className="h-4 w-4" />}
              {isRequesting ? "Requesting..." : "Allow Location Access"}
            </button>
            <button
              onClick={handleDeny}
              disabled={isRequesting}
              className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" /> Not Now
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" /> Continue to Dashboard
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 text-xs text-gray-500 bg-gray-100 rounded-lg p-3 flex gap-2">
          <Eye className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <p><strong>Note:</strong> Location access is only used when you actively use bus tracking features. Your location is not tracked in the background.</p>
        </div>
      </div>
    </div>
  )
}
