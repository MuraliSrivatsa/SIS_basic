import React from 'react';

const MonthlyProgressTrend = ({ monthlyData }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold text-lg text-gray-700 mb-2">Monthly Progress Trend</h2>
      <p className="text-gray-500 text-sm mb-6">Track attendance and performance trends over time</p>

      <div className="relative h-64">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        <div className="ml-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {[0, 25, 50, 75, 100].map((value) => (
              <div
                key={value}
                className="absolute w-full border-t border-gray-200"
                style={{ top: `${100 - value}%` }}
              ></div>
            ))}
          </div>

         {/* Attendance line (light blue) */}
<svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>
  <polyline
    fill="none"
    stroke="#60A5FA"
    strokeWidth="1"  // thinner line
    points={monthlyData
      .map((data, index) => {
        const x = (index / (monthlyData.length - 1)) * 100;
        const y = 100 - data.attendance;
        return `${x},${y}`;
      })
      .join(' ')}
  />
  {monthlyData.map((data, index) => {
    const cx = (index / (monthlyData.length - 1)) * 100;
    const cy = 100 - data.attendance;
    return <circle key={`attendance-${index}`} cx={cx} cy={cy} r="2" fill="#60A5FA" />; // smaller circle
  })}
</svg>

{/* Performance line (dark) */}
<svg
  className="absolute inset-0 w-full h-full"
  viewBox="0 0 100 100"
  preserveAspectRatio="none"
>
  <polyline
    fill="none"
    stroke="#374151"
    strokeWidth="1"  // thinner line
    points={monthlyData
      .map((data, index) => {
        const x = (index / (monthlyData.length - 1)) * 100;
        const y = 100 - data.performance;
        return `${x},${y}`;
      })
      .join(' ')}
  />
  {monthlyData.map((data, index) => {
    const cx = (index / (monthlyData.length - 1)) * 100;
    const cy = 100 - data.performance;
    return <circle key={`performance-${index}`} cx={cx} cy={cy} r="2" fill="#374151" />; // smaller circle
  })}
</svg>

        </div>
      </div>

      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {monthlyData.map((data) => (
          <span key={data.month}>{data.month}</span>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          <span className="text-sm text-gray-600">Attendance</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
          <span className="text-sm text-gray-600">Performance</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyProgressTrend;
