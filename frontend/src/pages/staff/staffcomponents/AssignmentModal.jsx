import React, { useState, useEffect, useRef } from 'react';

export default function AssignmentModal({ isOpen, onClose, onSave, assignment }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [allowLate, setAllowLate] = useState(false);
  const [assignmentType, setAssignmentType] = useState('Homework');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState([]);

  const fileInputRef = useRef();

  useEffect(() => {
    if (assignment) {
      setTitle(assignment.title);
      setDescription(assignment.description);
      setPoints(assignment.maxPoints);
      setDueDate(assignment.dueDate);
      setDueTime(assignment.dueTime || '');
      setAllowLate(assignment.allowLate || false);
      setAssignmentType(assignment.type || 'Homework');
      setTags(assignment.tags || []);
      setAttachments(assignment.attachments || []);
    } else {
      setTitle('');
      setDescription('');
      setPoints(0);
      setDueDate('');
      setDueTime('');
      setAllowLate(false);
      setAssignmentType('Homework');
      setTags([]);
      setAttachments([]);
    }
  }, [assignment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    const assignmentData = {
      title,
      description,
      maxPoints: points,
      dueDate,
      dueTime,
      allowLate,
      type: assignmentType,
      tags,
      attachments,
      course: assignment ? assignment.course : 'New Course',
      teacher: assignment ? assignment.teacher : 'Dr. Unknown',
      status: 'Pending',
      submissions: '0/0',
      submissionCount: 0,
      progress: 0,
      grade: '',
      feedback: '',
    };
    onSave(assignmentData);
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    setAttachments([...attachments, ...files]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));
    setAttachments([...attachments, ...files]);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {assignment ? 'Edit Assignment' : 'Create New Assignment'}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter assignment title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter assignment description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
              <input
                type="number"
                min="0"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
              <select
                value={assignmentType}
                onChange={(e) => setAssignmentType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Homework</option>
                <option>Project</option>
                <option>Quiz</option>
                <option>Lab</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
            <div className="flex flex-col sm:flex-row sm:space-x-4 gap-3">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={allowLate}
                onChange={(e) => setAllowLate(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Allow Late Submissions</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span key={index} className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    aria-label={`Remove tag ${tag}`}
                    className="text-gray-600 hover:text-red-600 font-bold leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <form onSubmit={handleTagAdd}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (e.g., DFS)"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="off"
              />
            </form>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current.click()}
              className="relative rounded-md border-2 border-dashed border-gray-300 p-6 text-center text-gray-500 cursor-pointer hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              <p className="mb-2 select-none">Drag & drop files here, or click to browse</p>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              {attachments.length > 0 && (
                <div className="mt-4 max-h-40 overflow-auto text-left text-sm text-gray-700">
                  {attachments.map((file, index) => (
                    <div key={index} className="py-1 border-b border-gray-200 last:border-none">
                      <span className="font-medium">{file.name}</span>{' '}
                      <span className="text-gray-500">({file.size})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
            >
              {assignment ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
