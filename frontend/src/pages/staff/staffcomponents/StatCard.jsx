import React from 'react';

const StatCard = ({ title, value, subtitle, Icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;
