import React from 'react';
import NotificationCard from './NotificationCard';

export default function NotificationList({ notifications }) {
  return (
    <div className="space-y-4">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}
