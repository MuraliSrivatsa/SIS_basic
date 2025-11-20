import { useState } from "react"
import { motion } from "motion/react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import {
  TrendingUp,
  Users,
  Award,
  Target,
  Calendar,
  Download,
  BarChart3
} from "lucide-react"

export function StudentPerformanceAnalytics() {
  const [selectedYear, setSelectedYear] = useState("2024")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedMetric, setSelectedMetric] = useState("gpa")

  const performanceData = [
    { year: '2020', totalStudents: 2650, passRate: 87, averageGPA: 3.2, gradeA: 245, gradeB: 512, gradeC: 478, gradeD: 298, gradeF: 117, attendanceRate: 89 },
    { year: '2021', totalStudents: 2720, passRate: 89, averageGPA: 3.3, gradeA: 278, gradeB: 548, gradeC: 462, gradeD: 287, gradeF: 145, attendanceRate: 91 },
    { year: '2022', totalStudents: 2780, passRate: 91, averageGPA: 3.4, gradeA: 312, gradeB: 584, gradeC: 445, gradeD: 268, gradeF: 171, attendanceRate: 93 },
    { year: '2023', totalStudents: 2820, passRate: 93, averageGPA: 3.6, gradeA: 348, gradeB: 612, gradeC: 428, gradeD: 245, gradeF: 187, attendanceRate: 94 },
    { year: '2024', totalStudents: 2847, passRate: 94, averageGPA: 3.7, gradeA: 368, gradeB: 628, gradeC: 412, gradeD: 228, gradeF: 211, attendanceRate: 96 }
  ]

  const subjectPerformance = [
    { subject: 'Mathematics', year2022: 78, year2023: 82, year2024: 85 },
    { subject: 'Science', year2022: 82, year2023: 85, year2024: 88 },
    { subject: 'English', year2022: 85, year2023: 87, year2024: 89 },
    { subject: 'History', year2022: 80, year2023: 83, year2024: 86 },
    { subject: 'Geography', year2022: 79, year2023: 81, year2024: 84 },
    { subject: 'Physics', year2022: 75, year2023: 78, year2024: 81 },
    { subject: 'Chemistry', year2022: 77, year2023: 80, year2024: 83 },
    { subject: 'Biology', year2022: 83, year2023: 85, year2024: 87 }
  ]

  const currentYearData = performanceData.find(d => d.year === selectedYear) || performanceData[performanceData.length - 1]
  const gradeDistribution = [
    { grade: 'A', count: currentYearData.gradeA, percentage: Math.round((currentYearData.gradeA / currentYearData.totalStudents) * 100), color: '#22c55e' },
    { grade: 'B', count: currentYearData.gradeB, percentage: Math.round((currentYearData.gradeB / currentYearData.totalStudents) * 100), color: '#3b82f6' },
    { grade: 'C', count: currentYearData.gradeC, percentage: Math.round((currentYearData.gradeC / currentYearData.totalStudents) * 100), color: '#f59e0b' },
    { grade: 'D', count: currentYearData.gradeD, percentage: Math.round((currentYearData.gradeD / currentYearData.totalStudents) * 100), color: '#f97316' },
    { grade: 'F', count: currentYearData.gradeF, percentage: Math.round((currentYearData.gradeF / currentYearData.totalStudents) * 100), color: '#ef4444' }
  ]

  const years = ["2020", "2021", "2022", "2023", "2024"]
  const classes = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"]

  const gpaData = performanceData.map(d => d.averageGPA)
  const passRateData = performanceData.map(d => d.passRate)
  const attendanceData = performanceData.map(d => d.attendanceRate)

  const calculateTrend = (data) => {
    const current = data[data.length - 1]
    const previous = data[data.length - 2]
    return ((current - previous) / previous) * 100
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <BarChart3 className="h-6 w-6" />
            Student Performance Analytics
          </h1>
          <p className="text-gray-500">Multi-year student performance analysis and trends</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border rounded-lg p-2">
          {years.map(year => <option key={year} value={year}>{year}</option>)}
        </select>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="border rounded-lg p-2">
          <option value="all">All Classes</option>
          {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
        </select>
        <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="border rounded-lg p-2">
          <option value="gpa">GPA Trends</option>
          <option value="passRate">Pass Rate</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Average GPA", value: currentYearData.averageGPA.toFixed(1), change: `+${calculateTrend(gpaData).toFixed(1)}%`, icon: Award, color: "bg-green-500" },
          { title: "Pass Rate", value: `${currentYearData.passRate}%`, change: `+${calculateTrend(passRateData).toFixed(1)}%`, icon: Target, color: "bg-blue-500" },
          { title: "Attendance", value: `${currentYearData.attendanceRate}%`, change: `+${calculateTrend(attendanceData).toFixed(1)}%`, icon: Calendar, color: "bg-purple-500" },
          { title: "Total Students", value: currentYearData.totalStudents.toLocaleString(), change: "+1.0%", icon: Users, color: "bg-orange-500" }
        ].map((metric, index) => (
          <motion.div key={metric.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + index * 0.1 }}>
            <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
              <div>
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {metric.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${metric.color} rounded-xl flex items-center justify-center`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">5-Year Performance Trends</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="averageGPA" fill="#3b82f6" name="Average GPA" />
            <Bar dataKey="passRate" fill="#10b981" name="Pass Rate %" />
            <Bar dataKey="attendanceRate" fill="#f59e0b" name="Attendance %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subject vs Grades */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Subject-wise Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="subject" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="year2022" fill="#ef4444" name="2022" />
              <Bar dataKey="year2023" fill="#f59e0b" name="2023" />
              <Bar dataKey="year2024" fill="#10b981" name="2024" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Grade Distribution {selectedYear}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="count" label={({ grade, percentage }) => `${grade}: ${percentage}%`}>
                {gradeDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {gradeDistribution.map((g) => (
              <div key={g.grade} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: g.color }}></div>
                  <span>Grade {g.grade}</span>
                </div>
                <span>{g.count} ({g.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Performance Trajectory</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="averageGPA" stroke="#3b82f6" strokeWidth={3} />
            <Line type="monotone" dataKey="passRate" stroke="#10b981" strokeWidth={3} />
            <Line type="monotone" dataKey="attendanceRate" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
