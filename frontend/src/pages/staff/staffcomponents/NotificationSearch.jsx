import React from 'react';

export default function NotificationSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search announcements..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg"
    />
  );
}
