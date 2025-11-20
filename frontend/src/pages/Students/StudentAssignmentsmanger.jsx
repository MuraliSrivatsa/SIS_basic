import { useState } from "react"
import { Search, Upload, FileText, Calendar, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { toast } from "sonner@2.0.3"

export function AssignmentsManager() {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Data Structures Project",
      course: "Data Structures",
      courseCode: "CS 201",
      description: "Implement a binary search tree with insert, delete, and search operations.",
      dueDate: "2024-08-25",
      status: "pending",
      priority: "high",
      maxPoints: 100
    },
    {
      id: 2,
      title: "Calculus Problem Set #3",
      course: "Calculus II",
      courseCode: "MATH 201",
      description: "Complete problems 1-15 from Chapter 7. Show all work.",
      dueDate: "2024-08-27",
      status: "pending",
      priority: "medium",
      maxPoints: 50
    },
    {
      id: 3,
      title: "Physics Lab Report",
      course: "General Physics",
      courseCode: "PHYS 101",
      description: "Write a lab report on the pendulum experiment. Include data analysis.",
      dueDate: "2024-08-30",
      status: "pending",
      priority: "low",
      maxPoints: 75
    },
    {
      id: 4,
      title: "Chemistry Quiz",
      course: "General Chemistry",
      courseCode: "CHEM 101",
      description: "Online quiz covering molecular structures and bonding.",
      dueDate: "2024-08-22",
      status: "overdue",
      priority: "high",
      maxPoints: 20
    },
    {
      id: 5,
      title: "English Essay",
      course: "English Literature",
      courseCode: "ENG 101",
      description: "Write a 5-page essay analyzing themes in Shakespeare's Hamlet.",
      dueDate: "2024-08-15",
      submittedDate: "2024-08-14",
      status: "graded",
      priority: "medium",
      maxPoints: 100,
      earnedPoints: 87,
      grade: "B+",
      feedback: "Excellent analysis. Consider exploring symbolism more deeply."
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [submissionText, setSubmissionText] = useState("")

  const filteredAssignments = assignments.filter(assignment =>
    `${assignment.title} ${assignment.course} ${assignment.courseCode}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    })
  }

  const getDaysUntilDue = (dateString) => {
    const dueDate = new Date(dateString)
    const today = new Date()
    const diffTime = dueDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due Today"
    if (diffDays === 1) return "Due Tomorrow"
    return `${diffDays} days left`
  }

  const handleSubmitAssignment = () => {
    if (!selectedAssignment || !submissionText.trim()) return

    setAssignments(assignments.map(a =>
      a.id === selectedAssignment.id
        ? { ...a, status: "submitted", submittedDate: new Date().toISOString().split("T")[0] }
        : a
    ))

    setSelectedAssignment(null)
    setSubmissionText("")
    toast.success("Assignment submitted successfully!")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-gray-200 text-gray-700"
      case "submitted": return "bg-blue-100 text-blue-700"
      case "overdue": return "bg-red-100 text-red-700"
      case "graded": return "bg-green-100 text-green-700"
      default: return "bg-gray-200 text-gray-700"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700"
      case "medium": return "bg-yellow-100 text-yellow-700"
      case "low": return "bg-green-100 text-green-700"
      default: return "bg-gray-200 text-gray-700"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "graded":
      case "submitted": return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Clock className="h-4 w-4 text-orange-500" />
    }
  }

  const upcomingCount = assignments.filter(a => a.status === "pending").length
  const overdueCount = assignments.filter(a => a.status === "overdue").length
  const gradedCount = assignments.filter(a => a.status === "graded").length

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Assignments</h1>
        <p className="text-gray-500">View and manage your course assignments</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white shadow rounded-lg p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold">{upcomingCount}</p>
          </div>
          <Clock className="h-8 w-8 text-orange-500" />
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Overdue</p>
            <p className="text-2xl font-bold">{overdueCount}</p>
          </div>
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Graded</p>
            <p className="text-2xl font-bold">{gradedCount}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div className="bg-white shadow rounded-lg p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold">{assignments.length}</p>
          </div>
          <FileText className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border rounded-md p-2 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">Assignment</th>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">Due Date</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Priority</th>
                <th className="p-2 text-left">Points</th>
                <th className="p-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((assignment) => (
                <tr key={assignment.id} className="border-t">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-xs text-gray-500">{getDaysUntilDue(assignment.dueDate)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <p className="font-medium">{assignment.courseCode}</p>
                    <p className="text-xs text-gray-500">{assignment.course}</p>
                  </td>
                  <td className="p-2">{formatDate(assignment.dueDate)}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                  </td>
                  <td className="p-2">
                    {assignment.earnedPoints
                      ? `${assignment.earnedPoints}/${assignment.maxPoints}`
                      : `${assignment.maxPoints} pts`}
                  </td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold">{selectedAssignment.title}</h2>
            <p className="text-gray-500">{selectedAssignment.courseCode} - {selectedAssignment.course}</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="font-semibold">Description</p>
                <p className="text-sm text-gray-700">{selectedAssignment.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Due Date
                  </p>
                  <p>{formatDate(selectedAssignment.dueDate)}</p>
                </div>
                <div>
                  <p className="font-semibold">Points</p>
                  <p>
                    {selectedAssignment.earnedPoints
                      ? `${selectedAssignment.earnedPoints}/${selectedAssignment.maxPoints} (${selectedAssignment.grade})`
                      : `${selectedAssignment.maxPoints} points`}
                  </p>
                </div>
              </div>

              {selectedAssignment.feedback && (
                <div>
                  <p className="font-semibold">Instructor Feedback</p>
                  <p className="text-sm bg-gray-100 p-2 rounded">{selectedAssignment.feedback}</p>
                </div>
              )}

              {selectedAssignment.status === "pending" && (
                <div className="space-y-2">
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your submission..."
                    className="w-full border rounded p-2 text-sm"
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmitAssignment}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Submit Assignment
                    </button>
                    <button className="border px-4 py-2 rounded flex items-center gap-2 text-sm">
                      <Upload className="h-4 w-4" /> Upload File
                    </button>
                  </div>
                </div>
              )}

              {selectedAssignment.submittedDate && (
                <p className="text-sm text-green-600">
                  Submitted on {formatDate(selectedAssignment.submittedDate)}
                </p>
              )}
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 border rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
