import React from 'react';
import BarChart from './BarChart';
import ChartLegend from './ChartLegend';

const courseData = [
  { course: 'CS 101', avgScore: 85, passRate: 95 },
  { course: 'CS 201', avgScore: 78, passRate: 88 },
  { course: 'CS 301', avgScore: 80, passRate: 90 },
  { course: 'CS 401', avgScore: 82, passRate: 98 },
];

const yLabels = [100, 75, 50, 25, 0];

const CoursePerformanceOverview = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Course Performance Overview</h2>
        <p className="text-sm text-gray-600 mb-6">
          Average scores and pass rates across your courses
        </p>
        <ChartLegend />
        <div className="mt-8 border border-gray-300 rounded-md p-6 relative">
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-6 bottom-14 w-10 flex flex-col justify-between text-xs text-gray-500 font-mono z-10">
            {yLabels.map((label, index) => (
              <div key={index} className="flex justify-end pr-1" style={{ height: "40px" }}>
                {label}
              </div>
            ))}
          </div>
          {/* Y Axis line */}
          <div className="absolute left-10 top-6 h-[200px] bg-gray-300 w-[1px]"></div>
          {/* X Axis line */}
          <div className="absolute left-10 bottom-16 right-6 h-[1px] bg-gray-300"></div>
          {/* Bars with labels */}
          <div className="ml-12 mr-6 mt-6 flex justify-around items-end h-[200px]">
            {courseData.map((course, index) => (
              <BarChart key={index} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformanceOverview;
