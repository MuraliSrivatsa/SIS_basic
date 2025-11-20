import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, ClipboardList, Edit, GraduationCap, Plus, TrendingUp, Users } from "lucide-react"
import { toast } from "sonner"

export function GradesManager() {
  const [grades, setGrades] = useState([
    {
      id: '1',
      studentName: 'John Smith',
      studentId: 'STU001',
      course: 'CS 201',
      assignment: 'Binary Tree Implementation',
      grade: 85,
      maxPoints: 100,
      submissionDate: '2024-08-20',
      gradedDate: '2024-08-22',
      feedback: 'Good implementation, but could improve efficiency.',
      status: 'graded'
    },
    {
      id: '2',
      studentName: 'Sarah Johnson',
      studentId: 'STU002',
      course: 'CS 201',
      assignment: 'Algorithm Analysis',
      grade: 92,
      maxPoints: 100,
      submissionDate: '2024-08-19',
      gradedDate: '2024-08-21',
      feedback: 'Excellent analysis and clear explanations.',
      status: 'graded'
    },
    {
      id: '3',
      studentName: 'Michael Brown',
      studentId: 'STU003',
      course: 'CS 201',
      assignment: 'Data Structure Quiz',
      grade: 0,
      maxPoints: 50,
      submissionDate: '2024-08-23',
      feedback: '',
      status: 'pending'
    }
  ])

  const [selectedGrade, setSelectedGrade] = useState(null)
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false)

  const openGradeDialog = (grade) => {
    setSelectedGrade(grade)
    setIsGradeDialogOpen(true)
  }

  const saveGrade = () => {
    toast.success("Grade saved successfully!")
    setIsGradeDialogOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'late': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      
      {/* Header */}
      <motion.div className="flex items-center justify-between" variants={itemVariants}>
        <div>
          <h1 className="text-2xl font-bold">Grade Management</h1>
          <p className="text-gray-500">Review and grade student submissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsGradeDialogOpen(true)}
          className="flex items-center gap-2 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Grade
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="grid gap-6 md:grid-cols-4" variants={containerVariants}>
        {[
          { title: "Total Submissions", value: "124", subtitle: "+12% from last month", icon: <ClipboardList className="h-4 w-4 text-gray-400" /> },
          { title: "Graded", value: "98", subtitle: "79% completion rate", icon: <BarChart3 className="h-4 w-4 text-gray-400" /> },
          { title: "Pending", value: "26", subtitle: "Need attention", icon: <Users className="h-4 w-4 text-gray-400" /> },
          { title: "Class Average", value: "87.2%", subtitle: "+2.1% improvement", icon: <TrendingUp className="h-4 w-4 text-gray-400" /> }
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="p-4 bg-white border rounded-lg shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{stat.title}</p>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Grades List */}
      <motion.div variants={itemVariants} className="bg-white border rounded-lg shadow p-6">
        <h2 className="flex items-center gap-2 font-semibold mb-2">
          <GraduationCap className="h-5 w-5" /> Recent Submissions
        </h2>
        <p className="text-gray-500 text-sm mb-4">Student assignments and grades</p>
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium">{grade.studentName}</h4>
                  <span className="px-2 py-1 text-xs border rounded">{grade.studentId}</span>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(grade.status)}`}>{grade.status}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{grade.course} - {grade.assignment}</span>
                  <span>Submitted: {grade.submissionDate}</span>
                  {grade.status === 'graded' && (
                    <span>Grade: {grade.grade}/{grade.maxPoints}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {grade.status === 'graded' && (
                  <div className="text-right mr-4">
                    <p className="text-lg font-bold">{Math.round((grade.grade / grade.maxPoints) * 100)}%</p>
                    <p className="text-xs text-gray-500">{grade.grade}/{grade.maxPoints}</p>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openGradeDialog(grade)}
                  className="flex items-center gap-2 border rounded px-3 py-1 text-sm hover:bg-gray-100"
                >
                  <Edit className="h-4 w-4" />
                  {grade.status === 'graded' ? 'Edit' : 'Grade'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Grade Dialog (Custom Modal) */}
      {isGradeDialogOpen && selectedGrade && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-1">
              {selectedGrade.status === 'graded' ? 'Edit Grade' : 'Grade Assignment'}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{selectedGrade.studentName} - {selectedGrade.assignment}</p>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="points" className="block text-sm font-medium">Points Earned</label>
                  <input id="points" type="number" defaultValue={selectedGrade.grade} max={selectedGrade.maxPoints} className="mt-1 w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label htmlFor="maxPoints" className="block text-sm font-medium">Max Points</label>
                  <input id="maxPoints" type="number" defaultValue={selectedGrade.maxPoints} disabled className="mt-1 w-full border rounded px-3 py-2 bg-gray-100" />
                </div>
              </div>
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium">Feedback</label>
                <textarea id="feedback" defaultValue={selectedGrade.feedback} placeholder="Provide feedback..." className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsGradeDialogOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                <button onClick={saveGrade} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Grade</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
