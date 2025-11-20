import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const StudentTableRow = ({ student, onEdit, onDelete, formatDate, getStatusColor }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.id}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.email}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(student.enrollmentDate)}</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
        {student.status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{student.gpa.toFixed(2)}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(student)}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit student"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete student"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

const StudentList = ({ students, onEdit, onDelete, formatDate, getStatusColor }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {['Student ID', 'Name', 'Email', 'Enrollment Date', 'Status', 'GPA', 'Actions'].map((header) => (
            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        ))}
      </tbody>
    </table>
    {students.length === 0 && (
      <div className="px-6 py-12 text-center">
        <p className="text-gray-500">No students found matching your search criteria.</p>
      </div>
    )}
  </div>
);

export default StudentList;
