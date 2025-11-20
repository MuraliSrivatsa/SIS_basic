import React, { useState } from "react";
import LessonPlanList from "./LessonPlanList";
import NewLessonPlanModal from "./NewLessonPlanModal";

export default function LessonPlanPage() {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newPlan) => {
    const mappedPlan = {
      id: Date.now(),
      title: newPlan.title,
      subject: newPlan.subject,
      grade: newPlan.grade,
      date: newPlan.date,
      duration: newPlan.duration,
      status: newPlan.status,
      statusColor:
        newPlan.status === "Draft"
          ? "yellow"
          : newPlan.status === "Approved"
          ? "blue"
          : "green",
      learningObjectives: newPlan.objectives,
      activities: newPlan.activities.length,
      completedActivities: 0,
      materials: newPlan.materials.length,
      tags: newPlan.tags
        ? newPlan.tags.split(",").map((t) => t.trim())
        : [],
      notes: newPlan.teacherNotes || newPlan.studentNotes,
      materialPreviews: newPlan.materials.map((file) => ({
        type: file.name.split(".").pop(),
      })),
    };

    setLessonPlans([...lessonPlans, mappedPlan]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Create New Lesson Plan
      </button>

      <LessonPlanList lessonPlans={lessonPlans} selectedSubject="All Subjects" />

      <NewLessonPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
