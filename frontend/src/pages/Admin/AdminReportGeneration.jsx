import { useState } from "react"
import { motion } from "framer-motion"
import {
    FileText,
    Download,
    Settings,
    CheckCircle,
    Clock,
    AlertTriangle,
    Eye,
    BarChart3
} from "lucide-react"
import { toast } from "sonner"
import Sidebar from "../../components/sidebars/Sidebar"

export default function AdminReportGeneration() {
    const [activeTab, setActiveTab] = useState("generate")
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedTerm, setSelectedTerm] = useState("")
    const [academicYear, setAcademicYear] = useState("2024")

    const templates = [
        {
            id: "1",
            name: "Standard Term Report",
            type: "term-report",
            description: "Comprehensive term report with all subjects and attendance",
            subjects: ["Mathematics", "Science", "English", "History", "Geography"],
            includeGrades: true,
            includeAttendance: true,
            includeComments: true,
            includeGraphs: true,
            isActive: true,
            lastUsed: "2024-10-15"
        },
        {
            id: "2",
            name: "Mid-term Progress Report",
            type: "progress-report",
            description: "Quick progress overview for mid-term assessment",
            subjects: ["Mathematics", "Science", "English"],
            includeGrades: true,
            includeAttendance: false,
            includeComments: true,
            includeGraphs: false,
            isActive: true,
            lastUsed: "2024-10-10"
        },
        {
            id: "3",
            name: "Annual Summary Report",
            type: "annual-report",
            description: "Complete annual academic summary with year-over-year comparison",
            subjects: ["All Subjects"],
            includeGrades: true,
            includeAttendance: true,
            includeComments: true,
            includeGraphs: true,
            isActive: true,
            lastUsed: "2024-06-30"
        }
    ]

    const generationQueue = [
        {
            id: "1",
            templateName: "Standard Term Report",
            class: "Grade 10",
            term: "Term 1",
            academicYear: "2024",
            status: "generating",
            studentsCount: 120,
            completedCount: 85,
            startTime: "2024-10-20T14:30:00Z",
            estimatedCompletion: "2024-10-20T15:45:00Z",
            generatedBy: "System Admin"
        },
        {
            id: "2",
            templateName: "Mid-term Progress Report",
            class: "Grade 9",
            term: "Mid-term",
            academicYear: "2024",
            status: "completed",
            studentsCount: 95,
            completedCount: 95,
            startTime: "2024-10-20T13:00:00Z",
            estimatedCompletion: "2024-10-20T14:15:00Z",
            generatedBy: "System Admin"
        },
        {
            id: "3",
            templateName: "Standard Term Report",
            class: "Grade 11",
            term: "Term 1",
            academicYear: "2024",
            status: "pending",
            studentsCount: 110,
            completedCount: 0,
            startTime: "",
            estimatedCompletion: "",
            generatedBy: "System Admin"
        }
    ]

    const classes = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]
    const terms = ["Term 1", "Term 2", "Term 3", "Mid-term", "Final"]

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100"
            case "generating":
                return "text-blue-600 bg-blue-100"
            case "pending":
                return "text-yellow-600 bg-yellow-100"
            case "failed":
                return "text-red-600 bg-red-100"
            default:
                return "text-gray-600 bg-gray-100"
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return CheckCircle
            case "generating":
                return Clock
            case "pending":
                return Clock
            case "failed":
                return AlertTriangle
            default:
                return Clock
        }
    }

    const handleGenerateReports = () => {
        if (!selectedTemplate || !selectedClass || !selectedTerm) {
            toast.error("Please fill in all required fields")
            return
        }

        toast.success("Report generation started! Check the queue for progress.")
        setSelectedTemplate("")
        setSelectedClass("")
        setSelectedTerm("")
    }

    const formatTime = (dateString) => {
        if (!dateString) return ""
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="flex">
            <Sidebar role={"admin"}/>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container space-y-6 p-6"
            >
                {/* Header */}
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-semibold">
                        <FileText className="h-6 w-6" />
                        Report Generation System
                    </h1>
                    <p className="text-gray-600">
                        Generate automated report cards and academic reports for students
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    {[
                        { title: "Reports Generated", value: "1,247", icon: FileText, color: "bg-blue-500" },
                        { title: "Active Templates", value: templates.filter((t) => t.isActive).length, icon: Settings, color: "bg-green-500" },
                        { title: "In Queue", value: generationQueue.filter((g) => g.status === "pending" || g.status === "generating").length, icon: Clock, color: "bg-orange-500" },
                        { title: "Success Rate", value: "98.5%", icon: CheckCircle, color: "bg-purple-500" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="p-4 rounded-xl shadow bg-white flex items-center justify-between"
                        >
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="h-5 w-5 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div>
                    <div className="flex gap-2 border-b">
                        {["generate", "templates", "queue", "history"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 capitalize ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Generate Reports */}
                    {activeTab === "generate" && (
                        <div className="grid gap-6 lg:grid-cols-2 mt-6">
                            {/* Left - Form */}
                            <div className="bg-white shadow rounded-xl p-6 space-y-4">
                                <h2 className="font-semibold text-lg">Generate New Reports</h2>
                                <p className="text-sm text-gray-500">Create report cards for a specific class and term</p>

                                <div>
                                    <label className="block text-sm font-medium">Report Template</label>
                                    <select
                                        value={selectedTemplate}
                                        onChange={(e) => setSelectedTemplate(e.target.value)}
                                        className="w-full border rounded p-2 mt-1"
                                    >
                                        <option value="">Select a template...</option>
                                        {templates.filter((t) => t.isActive).map((t) => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Class/Grade</label>
                                        <select
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                            className="w-full border rounded p-2 mt-1"
                                        >
                                            <option value="">Select class...</option>
                                            {classes.map((c) => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Term</label>
                                        <select
                                            value={selectedTerm}
                                            onChange={(e) => setSelectedTerm(e.target.value)}
                                            className="w-full border rounded p-2 mt-1"
                                        >
                                            <option value="">Select term...</option>
                                            {terms.map((t) => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Academic Year</label>
                                    <input
                                        type="text"
                                        value={academicYear}
                                        onChange={(e) => setAcademicYear(e.target.value)}
                                        className="w-full border rounded p-2 mt-1"
                                    />
                                </div>

                                <button
                                    onClick={handleGenerateReports}
                                    disabled={!selectedTemplate || !selectedClass || !selectedTerm}
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    <FileText className="inline h-4 w-4 mr-2" />
                                    Generate Reports
                                </button>
                            </div>

                            {/* Right - Template Preview */}
                            <div className="bg-white shadow rounded-xl p-6">
                                <h2 className="font-semibold text-lg">Template Preview</h2>
                                {selectedTemplate ? (
                                    (() => {
                                        const template = templates.find((t) => t.id === selectedTemplate)
                                        if (!template) return null
                                        return (
                                            <div className="mt-4 space-y-3">
                                                <div>
                                                    <h3 className="font-medium">{template.name}</h3>
                                                    <p className="text-sm text-gray-500">{template.description}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium">Included:</h4>
                                                    <ul className="space-y-1 text-sm">
                                                        {template.includeGrades && <li>✔ Subject Grades</li>}
                                                        {template.includeAttendance && <li>✔ Attendance Records</li>}
                                                        {template.includeComments && <li>✔ Teacher Comments</li>}
                                                        {template.includeGraphs && <li>✔ Performance Graphs</li>}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium">Subjects:</h4>
                                                    <div className="flex flex-wrap gap-1">
                                                        {template.subjects.map((s) => (
                                                            <span key={s} className="bg-gray-200 text-xs px-2 py-1 rounded">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })()
                                ) : (
                                    <div className="text-center py-12 text-gray-400">
                                        <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                        <p>Select a template to see preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Templates */}
                    {activeTab === "templates" && (
                        <div className="mt-6 space-y-4">
                            {templates.map((t) => (
                                <div key={t.id} className="bg-white p-6 shadow rounded-xl flex justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-semibold">{t.name}</h3>
                                            <span className={`px-2 py-0.5 rounded text-xs ${t.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                                {t.isActive ? "Active" : "Inactive"}
                                            </span>
                                            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{t.type}</span>
                                        </div>
                                        <p className="text-gray-600">{t.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="border px-3 py-1 rounded text-sm">Preview</button>
                                        <button className="border px-3 py-1 rounded text-sm">Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Queue */}
                    {activeTab === "queue" && (
                        <div className="mt-6 space-y-4">
                            {generationQueue.map((g) => {
                                const StatusIcon = getStatusIcon(g.status)
                                const progress = g.status === "generating"
                                    ? (g.completedCount / g.studentsCount) * 100
                                    : g.status === "completed"
                                        ? 100
                                        : 0
                                return (
                                    <div key={g.id} className="bg-white p-6 shadow rounded-xl">
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="font-semibold">{g.templateName}</h3>
                                                    <span className={`px-2 py-0.5 rounded text-xs flex items-center gap-1 ${getStatusColor(g.status)}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {g.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Class: {g.class} | Term: {g.term} | Students: {g.studentsCount}
                                                </p>
                                                {g.status === "generating" && (
                                                    <div className="mt-2">
                                                        <div className="flex justify-between text-sm">
                                                            <span>Progress</span>
                                                            <span>{g.completedCount}/{g.studentsCount}</span>
                                                        </div>
                                                        <div className="h-2 bg-gray-200 rounded mt-1">
                                                            <div style={{ width: `${progress}%` }} className="h-2 bg-blue-600 rounded"></div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                {g.status === "completed" && (
                                                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        Download
                                                    </button>
                                                )}
                                                <button className="border px-3 py-1 rounded text-sm flex items-center gap-1">
                                                    <Eye className="h-3 w-3" /> Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* History */}
                    {activeTab === "history" && (
                        <div className="bg-white shadow rounded-xl p-6 mt-6 text-center text-gray-500">
                            <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Report generation history will appear here</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
