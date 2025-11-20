import React from 'react';

const ExamPerformanceChart = ({ examData }) => {
  const maxScore = Math.max(
    ...examData.flatMap(({ studentA, studentB, studentC }) => [studentA, studentB, studentC])
  );

  const yLabels = [0, 25, 50, 75, 100, Math.ceil(maxScore / 25) * 25];

  const chartHeight = 180;

  return (
    <div className="bg-white p-6 rounded shadow container">
      {/* Removed outer border here */}
      <h2 className="font-semibold text-lg text-gray-700 mb-2">Exam Performance Comparison</h2>
      <p className="text-gray-500 text-sm mb-6">Compare student performance across different assessments</p>

      {/* Inner bordered container for graph + axes */}
      <div className="flex border-2 border-gray-300 rounded p-4">
        {/* Y Axis Labels */}
        <div className="flex flex-col justify-between h-[180px] pr-3 text-xs text-gray-500 font-mono">
          {yLabels.slice().reverse().map((label) => (
            <div key={label} style={{ height: `${chartHeight / (yLabels.length - 1)}px` }}>
              {label}
            </div>
          ))}
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          {/* Y Axis line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-300"></div>
          {/* X Axis line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300"
            style={{ marginLeft: '30px' }}
          ></div>

          <div className="flex justify-between items-end h-[180px] pl-6">
            {examData.map((exam) => (
              <div key={exam.exam} className="flex flex-col items-center space-y-2 w-[80px]">
                {/* Bars container */}
                <div className="flex space-x-1 items-end h-full">
                  {['studentA', 'studentB', 'studentC'].map((studentKey, idx) => {
                    const score = exam[studentKey];
                    const height = (score / maxScore) * chartHeight;
                    const colors = ['bg-purple-600', 'bg-green-500', 'bg-red-500'];

                    return (
                      <div
                        key={studentKey}
                        className={`${colors[idx]} rounded-t`}
                        style={{ width: '15px', height: `${height}px`, minHeight: '10px' }}
                        title={`${studentKey}: ${score}`}
                      ></div>
                    );
                  })}
                </div>
                <span className="text-xs text-gray-600 text-center">{exam.exam}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6 text-sm text-gray-600">
        <span>
          <span className="inline-block w-4 h-4 bg-purple-600 rounded mr-1 align-middle"></span>
          Student A
        </span>
        <span>
          <span className="inline-block w-4 h-4 bg-green-500 rounded mr-1 align-middle"></span>
          Student B
        </span>
        <span>
          <span className="inline-block w-4 h-4 bg-red-500 rounded mr-1 align-middle"></span>
          Student C
        </span>
      </div>
    </div>
  );
};

export default ExamPerformanceChart;
