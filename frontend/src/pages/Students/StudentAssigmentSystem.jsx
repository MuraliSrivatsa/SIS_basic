import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Award,
  Plus,
  Send,
  Upload,
  Download,
  Eye,
  Users
} from "lucide-react"
import { toast } from "sonner";
import Sidebar from "../../components/sidebars/Sidebar";

// Date formatter
const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

export function AssignmentSystem({ userRole, userId, userName }) {
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    maxPoints: 100,
    type: 'homework',
    instructions: ''
  })
  const [submissionText, setSubmissionText] = useState('')

  // Mock Data
  useEffect(() => {
    if (userRole === 'teacher') {
      setAssignments([
        {
          id: '1',
          title: 'Data Structures Project',
          description: 'Implement a binary search tree',
          dueDate: '2024-10-30',
          maxPoints: 100,
          type: 'project',
          status: 'published'
        }
      ])
    } else {
      setAssignments([
        {
          id: '2',
          title: 'Math Homework',
          description: 'Complete chapter 5 exercises',
          dueDate: '2024-10-27',
          maxPoints: 50,
          type: 'homework',
          status: 'published'
        }
      ])
    }
  }, [userRole])

  const handleCreateAssignment = () => {
    const assignment = {
      id: Date.now().toString(),
      ...newAssignment,
      dueDate: formatDate(newAssignment.dueDate),
      status: 'published'
    }
    setAssignments(prev => [...prev, assignment])
    setIsCreating(false)
    setNewAssignment({
      title: '',
      description: '',
      dueDate: new Date(),
      maxPoints: 100,
      type: 'homework',
      instructions: ''
    })
    toast.success("Assignment created!")
  }

  return (
    <div className="flex">
          {/* Sidebar */}
          <Sidebar role={"student"}/>
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y- container"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          Assignments
        </h2>
        {userRole === 'teacher' && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            New Assignment
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b pb-2">
        {['all','pending','graded','overdue'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-3 py-1 rounded-md ${
              activeTab === tab ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignment List */}
      <div className="grid gap-4">
        {assignments.map(assignment => (
          <div 
            key={assignment.id} 
            className="p-4 rounded-xl border shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                <p className="text-gray-600 text-sm">{assignment.description}</p>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                {assignment.type}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
              <p>Due: {assignment.dueDate}</p>
              <p>Max: {assignment.maxPoints} pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Create Assignment</h3>
            <div className="space-y-3">
              <input 
                type="text"
                placeholder="Title"
                className="w-full border rounded-md px-3 py-2"
                value={newAssignment.title}
                onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
              />
              <textarea 
                placeholder="Description"
                className="w-full border rounded-md px-3 py-2"
                value={newAssignment.description}
                onChange={e => setNewAssignment({...newAssignment, description: e.target.value})}
              />
              <input 
                type="date"
                className="w-full border rounded-md px-3 py-2"
                onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
              />
              <input 
                type="number"
                placeholder="Max Points"
                className="w-full border rounded-md px-3 py-2"
                value={newAssignment.maxPoints}
                onChange={e => setNewAssignment({...newAssignment, maxPoints: e.target.value})}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAssignment}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
    </div>
  )
}
