import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DollarSign, Calendar, Download, CreditCard, AlertTriangle, CheckCircle, Clock, Receipt, BookOpen, GraduationCap, Target, TrendingUp } from "lucide-react"
import { toast } from "sonner"

export function FeeDetails({ parentName, children }) {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [selectedFee, setSelectedFee] = useState(null)

  // Mock student data
  const students = [
    { id: '1', name: 'John Smith', grade: '10th Grade', rollNumber: 'STU001', totalFees: 12000, paidFees: 8000, pendingFees: 4000 },
    { id: '2', name: 'Emma Smith', grade: '8th Grade', rollNumber: 'STU005', totalFees: 10000, paidFees: 10000, pendingFees: 0 }
  ]

  const currentStudent = students.find(s => s.id === selectedStudent) || students[0]

  const feeStructure = [
    { id: '1', category: 'Tuition Fee', amount: 3000, dueDate: '2024-09-15', status: 'paid', description: 'Monthly tuition fee', semester: 'Fall 2024' },
    { id: '2', category: 'Sports Fee', amount: 300, dueDate: '2024-10-15', status: 'pending', description: 'Sports facilities', semester: 'Fall 2024' },
    { id: '3', category: 'Transport Fee', amount: 600, dueDate: '2024-08-15', status: 'overdue', description: 'Bus transportation', semester: 'Fall 2024' }
  ]

  useEffect(() => {
    if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0].id)
    }
  }, [students, selectedStudent])

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return "bg-green-100 text-green-700"
      case 'pending': return "bg-yellow-100 text-yellow-700"
      case 'overdue': return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const makePayment = (fee) => {
    setSelectedFee(fee)
    setPaymentDialogOpen(true)
  }

  const processPayment = () => {
    toast.success("Payment processed successfully!")
    setPaymentDialogOpen(false)
    setSelectedFee(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Fee Details & Payments
          </h1>
          <p className="text-gray-500">Manage your children's school fees</p>
        </div>

        <select 
          className="border rounded px-3 py-2"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name} - {student.grade}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-500">Total Fees</h3>
          <p className="text-xl font-bold">${currentStudent.totalFees}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-500">Paid Fees</h3>
          <p className="text-xl font-bold text-green-600">${currentStudent.paidFees}</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-sm text-gray-500">Pending Fees</h3>
          <p className="text-xl font-bold text-red-600">${currentStudent.pendingFees}</p>
        </div>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {currentStudent.pendingFees > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-orange-100 border-l-4 border-orange-400 rounded">
            <p className="text-orange-800">
              {currentStudent.name} has <b>${currentStudent.pendingFees}</b> in pending fees.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fees List */}
      <div className="space-y-4">
        {feeStructure.map(fee => (
          <div key={fee.id} className="flex items-center justify-between border p-4 rounded-lg bg-white shadow-sm">
            <div>
              <h4 className="font-medium">{fee.category}</h4>
              <p className="text-sm text-gray-500">{fee.description}</p>
              <p className="text-sm text-gray-400">Due: {new Date(fee.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs ${getStatusColor(fee.status)}`}>{fee.status}</span>
              {fee.status !== "paid" && (
                <button 
                  onClick={() => makePayment(fee)} 
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Dialog */}
      {paymentDialogOpen && selectedFee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-2">Pay {selectedFee.category}</h2>
            <p className="text-gray-600 mb-4">{selectedFee.description}</p>
            <p className="font-bold text-xl mb-4">${selectedFee.amount}</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setPaymentDialogOpen(false)} 
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button 
                onClick={processPayment} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Pay ${selectedFee.amount}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
