import { motion } from "framer-motion"
import { BookOpen, Calendar, Clock, Target, Users, FileText, Eye, Download, Edit, Trash2 } from "lucide-react"
import { getStatusColor, getStatusIcon, formatDate } from "./utils"

export function LessonPlanCard({ 
  plan, 
  index, 
  userRole, 
  canEdit, 
  onEdit, 
  onDelete, 
  onView, 
  onDownload 
}) {
  const StatusIcon = getStatusIcon(plan.status)

  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -5, boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}
    >
      <div className="bg-white rounded-2xl shadow p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">{plan.title}</h3>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen className="h-4 w-4" />
              {plan.subject} • {plan.grade}
            </p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(plan.status)}`}>
              <StatusIcon className="h-4 w-4" />
              <span className="ml-1 capitalize">{plan.status}</span>
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Date & Duration */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(plan.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {plan.duration} min
            </div>
          </div>

          {/* Objectives */}
          <div>
            <h4 className="font-medium text-sm mb-2">Learning Objectives</h4>
            <div className="space-y-1">
              {plan.objectives.slice(0, 2).map((objective, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Target className="h-3 w-3 mt-0.5 text-gray-500" />
                  <p className="text-sm text-gray-600 line-clamp-1">{objective}</p>
                </div>
              ))}
              {plan.objectives.length > 2 && (
                <p className="text-xs text-gray-500">
                  +{plan.objectives.length - 2} more objectives
                </p>
              )}
            </div>
          </div>

          {/* Activities & Materials */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{plan.activities.length} activities</span>
            </div>
            {plan.materials.length > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{plan.materials.length} materials</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t">
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onView(plan)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Eye className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDownload(plan)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Download className="h-4 w-4" />
            </motion.button>
          </div>

          {canEdit && userRole === "teacher" && (
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(plan)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Edit className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(plan.id)}
                className="p-2 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
