import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DollarSign,
    Calendar,
    Download,
    CreditCard,
    AlertTriangle,
    CheckCircle,
    Clock,
    Receipt,
    BookOpen,
    GraduationCap,
    Target,
    TrendingUp,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import ParentSidebar from "./Parent_sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

// Animated counter component
const AnimatedCounter = ({ value, duration = 2000, prefix = "$", suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return (
        <motion.span
            key={value}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </motion.span>
    );
};

export function FeeDetails() {
    const [selectedStudent, setSelectedStudent] = useState("");
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [selectedFee, setSelectedFee] = useState(null);

    // Mock student data
    const students = [
        {
            id: "1",
            name: "John Smith",
            grade: "10th Grade",
            rollNumber: "STU001",
            totalFees: 12000,
            paidFees: 8000,
            pendingFees: 4000,
        },
        {
            id: "2",
            name: "Emma Smith",
            grade: "8th Grade",
            rollNumber: "STU005",
            totalFees: 10000,
            paidFees: 10000,
            pendingFees: 0,
        },
    ];

    const currentStudent = students.find((s) => s.id === selectedStudent) || students[0];

    // Mock fee structure
    const feeStructure = [
        { id: "1", category: "Tuition Fee", amount: 3000, dueDate: "2024-09-15", status: "paid", description: "Monthly tuition fee", semester: "Fall 2024" },
        { id: "2", category: "Laboratory Fee", amount: 500, dueDate: "2024-09-15", status: "paid", description: "Science lab usage", semester: "Fall 2024" },
        { id: "3", category: "Library Fee", amount: 200, dueDate: "2024-09-15", status: "paid", description: "Library access", semester: "Fall 2024" },
        { id: "4", category: "Sports Fee", amount: 300, dueDate: "2024-10-15", status: "pending", description: "Sports facilities", semester: "Fall 2024" },
        { id: "5", category: "Examination Fee", amount: 400, dueDate: "2024-11-01", status: "pending", description: "Semester exams", semester: "Fall 2024" },
        { id: "6", category: "Transport Fee", amount: 600, dueDate: "2024-08-15", status: "overdue", description: "Transport service", semester: "Fall 2024" },
    ];

    const paymentHistory = [
        { id: "1", date: "2024-08-15", amount: 3000, category: "Tuition Fee", method: "card", transactionId: "TXN001234", receipt: "RCP001234" },
        { id: "2", date: "2024-08-15", amount: 500, category: "Laboratory Fee", method: "bank", transactionId: "TXN001235", receipt: "RCP001235" },
        { id: "3", date: "2024-08-15", amount: 200, category: "Library Fee", method: "card", transactionId: "TXN001236", receipt: "RCP001236" },
    ];

    useEffect(() => {
        if (students.length > 0 && !selectedStudent) {
            setSelectedStudent(students[0].id);
        }
    }, [students, selectedStudent]);

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 border-green-200";
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "overdue":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const makePayment = (fee) => {
        setSelectedFee(fee);
        setPaymentDialogOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    };

    return (
        <div className="flex">
            <Sidebar role={"parent"}/>
            <motion.div className="container space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                {/* Header */}
                <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <div>
                        <h1 className="text-2xl mt-4 font-bold ">Fee Details & Payments</h1>
                        <p className="text-gray-500">Manage your children's school fees and history</p>
                    </div>
                    <select
                        className="border p-2 rounded"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                    >
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} - {student.grade}
                            </option>
                        ))}
                    </select>
                </motion.div>

                {/* Overview Cards */}
                <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
                    {/* Total Fees */}
                    <motion.div variants={itemVariants} className="p-4 border rounded-lg bg-white shadow">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Total Fees</p>
                            <GraduationCap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold">
                            <AnimatedCounter value={currentStudent.totalFees} />
                        </div>
                    </motion.div>

                    {/* Paid Fees */}
                    <motion.div variants={itemVariants} className="p-4 border rounded-lg bg-white shadow">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Paid Fees</p>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            <AnimatedCounter value={currentStudent.paidFees} />
                        </div>
                    </motion.div>

                    {/* Pending Fees */}
                    <motion.div variants={itemVariants} className="p-4 border rounded-lg bg-white shadow">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Pending Fees</p>
                            <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                            <AnimatedCounter value={currentStudent.pendingFees} />
                        </div>
                    </motion.div>

                    {/* Progress */}
                    <motion.div variants={itemVariants} className="p-4 border rounded-lg bg-white shadow">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium">Progress</p>
                            <Target className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold">
                            <AnimatedCounter
                                value={Math.round((currentStudent.paidFees / currentStudent.totalFees) * 100)}
                                prefix=""
                                suffix="%"
                            />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${(currentStudent.paidFees / currentStudent.totalFees) * 100}%` }}
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Pending Alert */}
                <AnimatePresence>
                    {currentStudent.pendingFees > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 bg-orange-50 border border-orange-200 rounded"
                        >
                            <div className="flex items-center gap-2 text-orange-700">
                                <AlertTriangle className="h-4 w-4" />
                                <p>
                                    <strong>{currentStudent.name}</strong> has <strong>${currentStudent.pendingFees}</strong> pending.
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Fees List */}
                <div className="space-y-4">
                    {feeStructure.map((fee) => (
                        <motion.div
                            key={fee.id}
                            variants={itemVariants}
                            className="flex justify-between items-center p-4 border rounded-lg bg-white shadow"
                        >
                            <div>
                                <h4 className="font-medium">{fee.category}</h4>
                                <p className="text-sm text-gray-500">{fee.description}</p>
                                <p className="text-xs text-gray-400">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs rounded ${getStatusColor(fee.status)}`}>{fee.status}</span>
                                {fee.status !== "paid" && (
                                    <button
                                        onClick={() => makePayment(fee)}
                                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
                                    >
                                        Pay Now
                                    </button>
                                )}
                                {fee.status === "paid" && (
                                    <button className="px-3 py-1 text-sm border rounded">Receipt</button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Payment Dialog */}
                {paymentDialogOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow w-96">
                            <h2 className="text-lg font-bold mb-2">Make Payment</h2>
                            <p className="text-sm text-gray-500 mb-4">
                                Pay {selectedFee?.category} for {currentStudent.name}
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setPaymentDialogOpen(false)}
                                    className="px-3 py-1 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setPaymentDialogOpen(false)}
                                    className="px-3 py-1 bg-indigo-600 text-white rounded"
                                >
                                    Pay ${selectedFee?.amount}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
