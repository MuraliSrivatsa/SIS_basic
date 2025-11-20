// LessonPlanCard.js
import React from 'react';

export default function LessonPlanCard({ plan }) {
  const getStatusBadge = (status, color) => {
    const baseClasses =
      "px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1";
    switch (color) {
      case "green":
        return `${baseClasses} bg-green-100 text-green-700 border border-green-200`;
      case "blue":
        return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`;
      case "yellow":
        return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`;
    }
  };

  // Handle activities safely (number or array)
  const totalActivities =
    Array.isArray(plan.activities) ? plan.activities.length : plan.activities || 0;
  const completedActivities =
    Array.isArray(plan.completedActivities)
      ? plan.completedActivities.length
      : plan.completedActivities || 0;
  const progressPercent =
    totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
          {plan.title}
        </h2>
        <span className={getStatusBadge(plan.status, plan.statusColor)}>
          {plan.statusColor === "green" && <span>✓</span>}
          {plan.statusColor === "blue" && <span>📘</span>}
          {plan.statusColor === "yellow" && <span>📝</span>}
          {plan.status}
        </span>
      </div>

      {/* Subject and Grade */}
      <p className="text-gray-600 text-sm mb-3">
        {plan.subject} • {plan.grade}
      </p>

      {/* Date and Duration */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <span>📅</span>
          <span>{plan.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⏱</span>
          <span>{plan.duration}</span>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Learning Objectives
        </h3>
        <div className="space-y-1">
          {(plan.learningObjectives || []).map((objective, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{objective}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {completedActivities}/{totalActivities} activities completed
        </p>
      </div>

      {/* Tags */}
      {plan.tags && plan.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {(plan.tags || []).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Notes */}
      {plan.notes && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-gray-700">
          📝 {plan.notes}
        </div>
      )}

      {/* Activities and Materials Summary */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <span>👥</span>
          <span>{totalActivities} activities</span>
        </div>
        <div className="flex items-center gap-1">
          <span>📁</span>
          <span>
            {Array.isArray(plan.materials) ? plan.materials.length : plan.materials || 0}{" "}
            materials
          </span>
        </div>
      </div>

      {/* Material Previews */}
      {(plan.materials || []).length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {(plan.materials || []).map((file, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-xs rounded-md flex items-center gap-1"
            >
              📄 {file.name ? file.name : file.type || "File"}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200">
            Start Lesson
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200">
            Mark Completed
          </button>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            ✏️
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
