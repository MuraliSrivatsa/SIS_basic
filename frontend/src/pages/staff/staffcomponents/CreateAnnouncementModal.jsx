// src/components/notifications/CreateAnnouncementModal.jsx

import React from 'react';

export default function CreateAnnouncementModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-xl">📢</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Announcement</h2>
              <p className="text-gray-600 mt-1">Send an important message</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              rows={6}
              placeholder="Enter your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Type', 'Priority', 'Send To'].map((label) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>{label} Option</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center gap-2">
            📤 Send
          </button>
        </div>
      </div>
    </div>
  );
}
