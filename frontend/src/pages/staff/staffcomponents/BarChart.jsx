import React from 'react';

const BarChart = ({ course }) => {
  // Normalize heights to the max value (100)
  const avgScoreHeight = (course.avgScore / 100) * 200;   // max bar height in px
  const passRateHeight = (course.passRate / 100) * 200;

  return (
    <div className="flex flex-col items-center w-20">
      <div className="flex gap-4 items-end h-[200px]">
        <div
          className="bg-blue-500 rounded w-6"
          style={{ height: `${avgScoreHeight}px` }}
        />
        <div
          className="bg-green-500 rounded w-6"
          style={{ height: `${passRateHeight}px` }}
        />
      </div>
      <div className="flex justify-between w-full mt-1 text-xs text-gray-600 font-semibold">
        <span>{course.avgScore}</span>
        <span>{course.passRate}%</span>
      </div>
      <span className="mt-2 text-sm text-gray-800 font-semibold">{course.course}</span>
    </div>
  );
};

export default BarChart;
