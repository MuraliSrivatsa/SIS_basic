import React from 'react';
import { getNotificationBackground, getPriorityBadge } from './utils/notificationUtils';

export default function NotificationCard({ notification }) {
  return (
    <div className={`rounded-lg border p-6 ${getNotificationBackground(notification.type)}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <span className="text-xl">{notification.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
            <div className="text-sm text-gray-600">
              <span>{notification.author} ({notification.role}) · {notification.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="bg-gray-200 px-2 py-1 rounded">{notification.audience}</span>
          <span className={`${getPriorityBadge(notification.priority)} px-2 py-1 rounded`}>
            {notification.priority}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{notification.content}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>👁 {notification.readCount}</span>
        <span>📊 {notification.engagement}</span>
      </div>
    </div>
  );
}
