import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar,
} from "recharts";
import PrincipalSidebar from "./PrincipalSideBar";
import Sidebar from "../../components/sidebars/Sidebar";

export default function PrincipalAnalytics() {
    const [year, setYear] = useState("2024");
    const [classFilter, setClassFilter] = useState("All Classes");
    const [trend, setTrend] = useState("GPA Trends");

    // Data
    const subjectPerformance = [
        { subject: "Biology", avg: 78 },
        { subject: "Chemistry", avg: 82 },
        { subject: "Physics", avg: 80 },
        { subject: "Geography", avg: 75 },
        { subject: "History", avg: 70 },
        { subject: "English", avg: 85 },
        { subject: "Science", avg: 88 },
        { subject: "Mathematics", avg: 90 },
    ];

    const gradeDistribution = [
        { name: "Grade A", value: 368, color: "#22c55e" },
        { name: "Grade B", value: 628, color: "#3b82f6" },
        { name: "Grade C", value: 412, color: "#facc15" },
        { name: "Grade D", value: 228, color: "#f97316" },
        { name: "Grade F", value: 211, color: "#ef4444" },
    ];

    const performanceTrajectory = [
        { year: "2021", score: 78 },
        { year: "2022", score: 82 },
        { year: "2023", score: 85 },
        { year: "2024", score: 88 },
    ];

    const performanceTrends = [
        { year: "2020", gpa: 3.2, pass: 90 },
        { year: "2021", gpa: 3.4, pass: 91 },
        { year: "2022", gpa: 3.5, pass: 92 },
        { year: "2023", gpa: 3.6, pass: 93 },
        { year: "2024", gpa: 3.7, pass: 94 },
    ];

    return (
        <div className="flex">
            <Sidebar role={"principal"}/>

            <div className="container p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800">
                            Student Performance Analytics
                        </h1>
                        <p className="text-gray-500">
                            Multi-year student performance analysis and trends
                        </p>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-black text-white rounded-lg shadow"
                    >
                        Export Report
                    </motion.button>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-4"
                >
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="px-4 py-2 rounded-lg border shadow-sm"
                    >
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
                    </select>

                    <select
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                        className="px-4 py-2 rounded-lg border shadow-sm"
                    >
                        <option>All Classes</option>
                        <option>Class 10</option>
                        <option>Class 12</option>
                    </select>

                    <select
                        value={trend}
                        onChange={(e) => setTrend(e.target.value)}
                        className="px-4 py-2 rounded-lg border shadow-sm"
                    >
                        <option>GPA Trends</option>
                        <option>Pass Rate Trends</option>
                    </select>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Average GPA", value: "3.7", change: "+2.8%" },
                        { label: "Pass Rate", value: "94%", change: "+1.1%" },
                        { label: "Attendance", value: "96%", change: "+2.1%" },
                        { label: "Total Students", value: "2,847", change: "+1.0%" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-xl p-4 shadow-md"
                        >
                            <p className="text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                            <p className="text-green-500 text-sm">{stat.change}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 5-Year Trends */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-5"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            5-Year Performance Trends
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={performanceTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="gpa" fill="#22c55e" />
                                <Bar dataKey="pass" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Subject Performance */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-5"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Subject-wise Performance
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={subjectPerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="avg" stroke="#6366f1" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                {/* Grade Distribution + Trajectory */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Grade Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-5"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Grade Distribution {year}
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={gradeDistribution}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {gradeDistribution.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Performance Trajectory */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-5"
                    >
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Performance Trajectory
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={performanceTrajectory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={{ r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
