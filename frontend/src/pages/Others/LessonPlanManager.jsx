import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { LessonPlanCard } from "./lesson-plan/LessonPlanCard"
import { LessonPlan } from "./lesson-plan/types"
import { SUBJECTS } from "./lesson-plan/constants"
import { MOCK_LESSON_PLANS } from "./lesson-plan/mockData"

export function LessonPlanManager({ teacherName, userRole, canEdit = true }) {
  const [lessonPlans, setLessonPlans] = useState([])
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState("all")

  useEffect(() => {
    setLessonPlans(MOCK_LESSON_PLANS)
  }, [])

  const filteredPlans = lessonPlans.filter(plan => {
    if (selectedSubject !== "all" && plan.subject !== selectedSubject) return false
    return true
  })

  const createNewPlan = () => {
    setSelectedPlan(null)
    setIsDialogOpen(true)
  }

  const editPlan = (plan) => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const deletePlan = (planId) => {
    setLessonPlans(prev => prev.filter(plan => plan.id !== planId))
    alert("Lesson plan deleted successfully!") // replaced toast
  }

  const viewPlan = (plan) => {
    setSelectedPlan(plan)
  }

  const downloadPlan = (plan) => {
    alert(`Lesson plan "${plan.title}" downloaded successfully!`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <motion.h1
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_100%] text-2xl font-bold"
          >
            {userRole === "principal"
              ? "Lesson Plan Overview"
              : "Lesson Plan Manager"}
          </motion.h1>
          <p className="text-gray-500">
            {userRole === "principal"
              ? "Review and monitor lesson plans across all subjects"
              : "Create, manage, and organize your lesson plans"}
          </p>
        </div>

        {/* Subject Dropdown + Button */}
        <div className="flex items-center gap-2">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>
                {subject === "all" ? "All Subjects" : subject}
              </option>
            ))}
          </select>

          {canEdit && userRole === "teacher" && (
            <motion.button
              onClick={createNewPlan}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow hover:bg-indigo-700 transition"
            >
              <Plus className="h-4 w-4" />
              New Lesson Plan
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Lesson Plans Grid */}
      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
      >
        <AnimatePresence>
          {filteredPlans.map((plan, index) => (
            <LessonPlanCard
              key={plan.id}
              plan={plan}
              index={index}
              userRole={userRole}
              canEdit={canEdit}
              onEdit={editPlan}
              onDelete={deletePlan}
              onView={viewPlan}
              onDownload={downloadPlan}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Simple Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-2">
              {selectedPlan ? "Edit Lesson Plan" : "Create New Lesson Plan"}
            </h2>
            <p className="text-gray-500 mb-4">
              {selectedPlan
                ? "Modify lesson plan details"
                : "Create a new lesson plan for your course"}
            </p>
            <div className="p-4 border rounded-lg text-gray-500">
              Lesson plan form coming soon...
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
