import React from 'react';
import { Users, BarChart3, Clock, Star } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getEnrollmentColor = (status) => {
  switch (status) {
    case 'Good Enrollment':
      return 'bg-blue-500';
    case 'High Enrollment':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-gray-900">{course.id}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
            {course.status}
          </span>
        </div>
      </div>

      <h4 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h4>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Instructor:</span>
          <span className="font-medium text-gray-900">{course.instructor}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Credits:</span>
          <span className="font-medium text-gray-900">{course.credits}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Department:</span>
          <span className="font-medium text-gray-900">{course.department}</span>
        </div>
      </div>

      {/* Schedule */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Schedule</h5>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{course.schedule}</span>
          </div>
          {course.room && <div className="ml-6">{course.room}</div>}
        </div>
      </div>

      {/* Enrollment */}
      {course.enrollment.total > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-600">Enrollment</span>
            <span className="font-medium text-gray-900">
              {course.enrollment.current}/{course.enrollment.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full ${getEnrollmentColor(course.enrollmentStatus)}`}
              style={{ width: `${course.enrollment.percentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">{course.enrollmentStatus}</span>
        </div>
      )}

      {/* Waitlist & Rating */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <div>
          <span className="text-gray-600">Waitlist:</span>
          <span className="font-medium text-gray-900 ml-2">{course.waitlist} students</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-600">Rating:</span>
          <div className="flex items-center gap-1 ml-2">
            {renderStars(course.rating)}
            <span className="font-medium text-gray-900 ml-1">{course.rating}</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Users className="w-4 h-4" />
          View Students
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <BarChart3 className="w-4 h-4" />
          Analytics
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
