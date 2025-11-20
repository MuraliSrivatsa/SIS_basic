// src/utils/notificationUtils.js

import { PRIORITY } from '../constants/notificationTypes';

export const getNotificationBackground = (type) => {
  switch (type) {
    case PRIORITY.URGENT:
      return 'bg-red-50 border-red-200';
    case PRIORITY.HIGH:
      return 'bg-blue-50 border-blue-200';
    default:
      return 'bg-blue-50 border-blue-200';
  }
};

export const getPriorityBadge = (priority) => {
  switch (priority) {
    case PRIORITY.URGENT:
      return 'bg-red-100 text-red-700 border border-red-200';
    case PRIORITY.HIGH:
      return 'bg-blue-100 text-blue-700 border border-blue-200';
    case PRIORITY.MEDIUM:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200';
  }
};
