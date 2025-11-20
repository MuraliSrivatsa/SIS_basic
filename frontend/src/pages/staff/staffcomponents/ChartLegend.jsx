import React from 'react';

const ChartLegend = () => (
  <div className="flex justify-center space-x-8">
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 bg-blue-500 rounded shadow-sm"></div>
      <span className="text-sm font-medium text-gray-700">Average Score</span>
    </div>
    <div className="flex items-center space-x-3">
      <div className="w-4 h-4 bg-green-500 rounded shadow-sm"></div>
      <span className="text-sm font-medium text-gray-700">Pass Rate (%)</span>
    </div>
  </div>
);

export default ChartLegend;