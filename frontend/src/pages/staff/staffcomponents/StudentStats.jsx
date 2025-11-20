import React from 'react';

const StatsCard = ({ value, label, color = 'text-gray-900' }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

const StudentStats = ({ students }) => (
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatsCard value={students.length} label="Total Students" />
    <StatsCard value={students.filter(s => s.status === 'active').length} label="Active Students" color="text-green-600" />
    <StatsCard value={students.filter(s => s.status === 'graduated').length} label="Graduated" color="text-blue-600" />
    <StatsCard
      value={students.length > 0 ? (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2) : '0.00'}
      label="Average GPA"
    />
  </div>
);

export default StudentStats;