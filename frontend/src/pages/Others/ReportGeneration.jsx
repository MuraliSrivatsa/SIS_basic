import { useState } from "react"
import { motion } from "motion/react"
import { 
  FileText, 
  Download, 
  Settings, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  BarChart3
} from "lucide-react"
import { toast } from "sonner@2.0.3"

export function ReportGeneration() {
  const [activeTab, setActiveTab] = useState('generate')
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedTerm, setSelectedTerm] = useState('')
  const [academicYear, setAcademicYear] = useState('2024')

  const templates = [
    {
      id: '1',
      name: 'Standard Term Report',
      type: 'term-report',
      description: 'Comprehensive term report with all subjects and attendance',
      subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography'],
      includeGrades: true,
      includeAttendance: true,
      includeComments: true,
      includeGraphs: true,
      isActive: true,
      lastUsed: '2024-10-15'
    },
    {
      id: '2',
      name: 'Mid-term Progress Report',
      type: 'progress-report',
      description: 'Quick progress overview for mid-term assessment',
      subjects: ['Mathematics', 'Science', 'English'],
      includeGrades: true,
      includeAttendance: false,
      includeComments: true,
      includeGraphs: false,
      isActive: true,
      lastUsed: '2024-10-10'
    }
  ]

  const generationQueue = [
    {
      id: '1',
      templateName: 'Standard Term Report',
      class: 'Grade 10',
      term: 'Term 1',
      academicYear: '2024',
      status: 'generating',
      studentsCount: 120,
      completedCount: 85,
      startTime: '2024-10-20T14:30:00Z',
      estimatedCompletion: '2024-10-20T15:45:00Z',
      generatedBy: 'System Admin'
    },
    {
      id: '2',
      templateName: 'Mid-term Progress Report',
      class: 'Grade 9',
      term: 'Mid-term',
      academicYear: '2024',
      status: 'completed',
      studentsCount: 95,
      completedCount: 95,
      startTime: '2024-10-20T13:00:00Z',
      estimatedCompletion: '2024-10-20T14:15:00Z',
      generatedBy: 'System Admin'
    }
  ]

  const classes = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  const terms = ['Term 1', 'Term 2', 'Term 3', 'Mid-term', 'Final']

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'generating': return 'bg-blue-100 text-blue-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'generating': return Clock
      case 'pending': return Clock
      case 'failed': return AlertTriangle
      default: return Clock
    }
  }

  const handleGenerateReports = () => {
    if (!selectedTemplate || !selectedClass || !selectedTerm) {
      toast.error('Please fill in all required fields')
      return
    }
    toast.success('Report generation started! Check the queue for progress.')
    setSelectedTemplate('')
    setSelectedClass('')
    setSelectedTerm('')
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <FileText className="h-6 w-6" />
          Report Generation System
        </h1>
        <p className="text-gray-500">
          Generate automated report cards and academic reports for students
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        {['generate','templates','queue','history'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Generate Reports */}
      {activeTab === 'generate' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-semibold">Generate New Reports</h2>
            <div>
              <label className="block text-sm font-medium">Report Template</label>
              <select 
                value={selectedTemplate} 
                onChange={(e)=>setSelectedTemplate(e.target.value)}
                className="w-full border p-2 rounded-md"
              >
                <option value="">Select template...</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Class</label>
                <select 
                  value={selectedClass} 
                  onChange={(e)=>setSelectedClass(e.target.value)}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select class...</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Term</label>
                <select 
                  value={selectedTerm} 
                  onChange={(e)=>setSelectedTerm(e.target.value)}
                  className="w-full border p-2 rounded-md"
                >
                  <option value="">Select term...</option>
                  {terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Academic Year</label>
              <input 
                type="text" 
                value={academicYear}
                onChange={(e)=>setAcademicYear(e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <button 
              onClick={handleGenerateReports}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              <FileText className="inline h-4 w-4 mr-2" />
              Generate Reports
            </button>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Template Preview</h2>
            {selectedTemplate ? (
              <div className="mt-4">
                {(() => {
                  const template = templates.find(t => t.id === selectedTemplate)
                  if (!template) return null
                  return (
                    <>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                      <div className="mt-3">
                        <p className="font-medium text-sm">Subjects:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {template.subjects.map(s => (
                            <span key={s} className="bg-gray-200 px-2 py-1 rounded text-xs">{s}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-2" />
                <p>Select a template to see preview</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <div className="grid gap-4">
          {templates.map(template => (
            <div key={template.id} className="border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="text-gray-500 text-sm">{template.description}</p>
                </div>
                <button className="px-3 py-1 text-sm border rounded-md">Preview</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Queue */}
      {activeTab === 'queue' && (
        <div className="grid gap-4">
          {generationQueue.map(generation => {
            const StatusIcon = getStatusIcon(generation.status)
            return (
              <div key={generation.id} className="border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{generation.templateName}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(generation.status)}`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {generation.status}
                    </span>
                  </div>
                  {generation.status === 'completed' && (
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                      <Download className="h-3 w-3" /> Download
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="border rounded-lg p-6 shadow-sm text-center text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
          Report generation history will appear here
        </div>
      )}
    </div>
  )
}
