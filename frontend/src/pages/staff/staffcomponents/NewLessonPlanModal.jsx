import React, { useState } from "react";
import { X, Plus } from "lucide-react";

export default function NewLessonPlanModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    date: "",
    duration: "",
    objectives: [""],
    activities: [{ name: "", type: "", time: "" }],
    materials: [],
    tags: "",
    difficulty: "Medium",
    priority: "Medium",
    teacherNotes: "",
    studentNotes: "",
    checklist: [""],
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, materials: [...e.target.files] });
  };

  const addObjective = () => {
    setFormData({ ...formData, objectives: [...formData.objectives, ""] });
  };

  const updateObjective = (index, value) => {
    const newObjectives = [...formData.objectives];
    newObjectives[index] = value;
    setFormData({ ...formData, objectives: newObjectives });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, { name: "", type: "", time: "" }],
    });
  };

  const updateActivity = (index, field, value) => {
    const newActivities = [...formData.activities];
    newActivities[index][field] = value;
    setFormData({ ...formData, activities: newActivities });
  };

  const addChecklistItem = () => {
    setFormData({ ...formData, checklist: [...formData.checklist, ""] });
  };

  const updateChecklistItem = (index, value) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index] = value;
    setFormData({ ...formData, checklist: newChecklist });
  };

  const handleCreate = () => {
    onSave(formData); // call parent save function
    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Lesson Plan</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Lesson Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Lesson Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade/Class"
            value={formData.grade}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 40 min)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Objectives */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Learning Objectives</h3>
          {formData.objectives.map((obj, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Objective ${i + 1}`}
              value={obj}
              onChange={(e) => updateObjective(i, e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addObjective}
            className="flex items-center text-blue-600 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Objective
          </button>
        </div>

        {/* Activities */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Activities</h3>
          {formData.activities.map((activity, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Activity Name"
                value={activity.name}
                onChange={(e) => updateActivity(i, "name", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Type (quiz, discussion...)"
                value={activity.type}
                onChange={(e) => updateActivity(i, "type", e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Time (min)"
                value={activity.time}
                onChange={(e) => updateActivity(i, "time", e.target.value)}
                className="border p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addActivity}
            className="flex items-center text-blue-600 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Activity
          </button>
        </div>

        {/* Materials */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Materials</h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Tags & Options */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <textarea
            name="teacherNotes"
            placeholder="Teacher Notes (private)"
            value={formData.teacherNotes}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-2"
          />
          <textarea
            name="studentNotes"
            placeholder="Student Notes (shared)"
            value={formData.studentNotes}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Checklist */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Checklist</h3>
          {formData.checklist.map((item, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Item ${i + 1}`}
              value={item}
              onChange={(e) => updateChecklistItem(i, e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addChecklistItem}
            className="flex items-center text-blue-600 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Item
          </button>
        </div>

        {/* Status */}
        <div className="mb-4">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option>Draft</option>
            <option>Approved</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded w-1/2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
