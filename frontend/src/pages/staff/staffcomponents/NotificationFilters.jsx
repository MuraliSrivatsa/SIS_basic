import React from 'react';

export default function NotificationFilters({ activeTab, onChange }) {
  const tabs = ['all', 'unread', 'urgent'];

  return (
    <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
