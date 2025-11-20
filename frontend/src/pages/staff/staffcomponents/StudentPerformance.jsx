import React from 'react';
import ExamPerformanceChart from './ExamPerformanceChart';
import MonthlyProgressTrend from './MonthlyProgressTrend';

const StudentPerformance = () => {
  // Define data inside the component
  const examData = [
    { exam: 'Midterm 1', studentA: 82, studentB: 97, studentC: 65 },
    { exam: 'Midterm 2', studentA: 78, studentB: 93, studentC: 58 },
    { exam: 'Final Exam', studentA: 85, studentB: 100, studentC: 70 },
    { exam: 'Project', studentA: 89, studentB: 102, studentC: 75 },
  ];

  const monthlyData = [
    { month: 'Jan', attendance: 80, performance: 70 },
    { month: 'Feb', attendance: 75, performance: 80 },
    { month: 'Mar', attendance: 90, performance: 85 },
    { month: 'Apr', attendance: 70, performance: 75 },
    { month: 'May', attendance: 85, performance: 90 },
  ];

  return (
    <div className="space-y-6">
      <ExamPerformanceChart examData={examData} />
      <MonthlyProgressTrend monthlyData={monthlyData} />
    </div>
  );
};

export default StudentPerformance;
