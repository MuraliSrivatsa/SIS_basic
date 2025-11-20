// src/data/mockNotifications.js

const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Important: Exam Schedule Updated',
    author: 'System Administrator',
    role: 'admin',
    timestamp: 'Oct 20, 04:00 PM',
    content: 'The midterm examination schedule has been updated...',
    audience: 'students',
    priority: 'urgent',
    readCount: '1250 / 2847 read',
    engagement: '44% engagement',
    icon: '⚠️',
  },
  {
    id: 2,
    type: 'medium',
    title: 'Faculty Meeting Tomorrow',
    author: 'Dr. Sarah Smith',
    role: 'teacher',
    timestamp: 'Oct 20, 01:45 PM',
    content: 'Reminder: faculty meeting scheduled for tomorrow...',
    audience: 'teachers',
    priority: 'medium',
    readCount: '142 / 156 read',
    engagement: '91% engagement',
    icon: 'ℹ️',
  },
  // Add other notifications...
];

export default mockNotifications;
