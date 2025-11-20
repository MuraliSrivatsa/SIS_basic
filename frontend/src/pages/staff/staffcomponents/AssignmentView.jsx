import React from 'react';

export default function AssignmentView({ assignment, onClose, isOpen }) {
  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4">Assignment Details</h2>
        
        <p><strong>Title:</strong> {assignment.title}</p>
        <p><strong>Course:</strong> {assignment.course}</p>
        <p><strong>Teacher:</strong> {assignment.teacher}</p>
        <p><strong>Type:</strong> {assignment.type}</p>
        <p><strong>Status:</strong> {assignment.status}</p>
        <p><strong>Description:</strong> {assignment.description}</p>
        <p><strong>Due Date:</strong> {assignment.dueDate} {assignment.dueTime}</p>
        <p><strong>Max Points:</strong> {assignment.maxPoints}</p>
        <p><strong>Submissions:</strong> {assignment.submissions}</p>
        <p><strong>Progress:</strong> {assignment.progress}%</p>

        {assignment.grade && (
          <p><strong>Grade:</strong> {assignment.grade}</p>
        )}

        {assignment.feedback && (
          <p><strong>Feedback:</strong> {assignment.feedback}</p>
        )}

        {assignment.tags.length > 0 && (
          <p><strong>Tags:</strong> {assignment.tags.join(', ')}</p>
        )}

        {assignment.attachments.length > 0 && (
          <div>
            <strong>Attachments:</strong>
            <ul className="list-disc ml-5">
              {assignment.attachments.map((file, idx) => (
                <li key={idx}>{file.name} ({file.size})</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
