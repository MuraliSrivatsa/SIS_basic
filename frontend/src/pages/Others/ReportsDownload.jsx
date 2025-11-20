import { useState } from "react"
import { motion } from "motion/react"
import {
  Download,
  FileText,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react"
import { toast } from "sonner@2.0.3"

export function ReportsDownload() {
  const [selectedChild, setSelectedChild] = useState("all")
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedType, setSelectedType] = useState("all")

  const children = [
    { id: "child1", name: "John Smith", grade: "Grade 10", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { id: "child2", name: "Emma Smith", grade: "Grade 8", image: "https://images.unsplash.com/photo-1494790108755-2616c52d7d6d?w=150&h=150&fit=crop&crop=face" }
  ]

  const reports = [/* same reports data from your code */]

  const filteredReports = reports.filter(report => {
    if (selectedChild !== "all" && report.childId !== selectedChild) return false
    if (selectedYear !== "all" && report.academicYear !== selectedYear) return false
    if (selectedType !== "all" && report.reportType !== selectedType) return false
    return true
  })

  const getReportTypeLabel = (type) => ({
    "term-report": "Term Report Card",
    "progress-report": "Progress Report",
    "exam-report": "Exam Report",
    "annual-report": "Annual Report"
  }[type] || type)

  const getReportTypeColor = (type) => ({
    "term-report": "bg-blue-100 text-blue-800",
    "progress-report": "bg-green-100 text-green-800",
    "exam-report": "bg-purple-100 text-purple-800",
    "annual-report": "bg-orange-100 text-orange-800"
  }[type] || "bg-gray-100 text-gray-800")

  const getStatusColor = (status) => ({
    available: "text-green-600",
    processing: "text-orange-600",
    pending: "text-red-600"
  }[status] || "text-gray-600")

  const getGradeColor = (grade) => {
    if (grade.startsWith("A")) return "text-green-600 bg-green-100"
    if (grade.startsWith("B")) return "text-blue-600 bg-blue-100"
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const handleDownload = (report) => {
    if (report.status !== "available") {
      toast.error("Report is not ready for download")
      return
    }
    toast.success(`Downloading ${getReportTypeLabel(report.reportType)} for ${report.childName}`)
  }

  const handlePreview = (report) => {
    toast.info(`Opening preview for ${report.childName}'s ${getReportTypeLabel(report.reportType)}`)
  }

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <FileText className="h-6 w-6" />
            Reports & Downloads
          </h1>
          <p className="text-gray-500">Download academic reports and progress cards for your children</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Available Reports", value: reports.filter(r => r.status === "available").length, icon: CheckCircle, color: "bg-green-500" },
          { title: "Processing", value: reports.filter(r => r.status === "processing").length, icon: Clock, color: "bg-orange-500" },
          { title: "Total Downloads", value: reports.reduce((sum, r) => sum + r.downloadCount, 0), icon: Download, color: "bg-blue-500" },
          { title: "Children", value: children.length, icon: Users, color: "bg-purple-500" }
        ].map(stat => (
          <div key={stat.title} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="p-4 border rounded-lg bg-white shadow-sm flex gap-3 flex-wrap">
        <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Children</option>
          {children.map(child => (
            <option key={child.id} value={child.id}>{child.name} - {child.grade}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="border rounded px-3 py-2">
          <option value="all">All Report Types</option>
          <option value="term-report">Term Reports</option>
          <option value="progress-report">Progress Reports</option>
          <option value="exam-report">Exam Reports</option>
          <option value="annual-report">Annual Reports</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="grid gap-4">
        {filteredReports.map(report => (
          <div key={report.id} className="border rounded-lg bg-white shadow-sm hover:shadow-lg transition-all">
            <div className="p-4 flex justify-between items-start">
              <div className="flex gap-4">
                <img src={report.childImage} alt={report.childName} className="h-12 w-12 rounded-full border" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{getReportTypeLabel(report.reportType)}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getReportTypeColor(report.reportType)}`}>
                      {report.reportType.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {report.childName} • {report.academicYear} • {report.term} {report.subject && `• ${report.subject}`}
                  </p>
                  <div className="flex gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatDate(report.generatedDate)}</span>
                    <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> {report.fileSize}</span>
                    {report.downloadCount > 0 && <span className="flex items-center gap-1"><Download className="h-4 w-4" /> {report.downloadCount}x</span>}
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${getStatusColor(report.status)}`}>
                {report.status === "available" && <CheckCircle className="h-4 w-4" />}
                {report.status === "processing" && <Clock className="h-4 w-4" />}
                {report.status === "pending" && <AlertCircle className="h-4 w-4" />}
                <span className="capitalize text-sm">{report.status}</span>
              </div>
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-500">Rank {report.rank} of {report.totalStudents} students</p>
              <div className="flex gap-2">
                <button onClick={() => handlePreview(report)} disabled={report.status !== "available"} className="px-3 py-1 border rounded text-sm hover:bg-gray-100 disabled:opacity-50">
                  <Eye className="h-3 w-3 inline mr-1" /> Preview
                </button>
                <button onClick={() => handleDownload(report)} disabled={report.status !== "available"} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50">
                  <Download className="h-4 w-4 inline mr-1" /> Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-medium mb-2">No reports found</h3>
          <p className="text-gray-500">No reports match your current filter criteria</p>
        </div>
      )}
    </motion.div>
  )
}
