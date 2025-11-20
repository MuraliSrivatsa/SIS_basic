import React from "react";
import LessonPlanCard from "./LessonPlanCard";

export default function LessonPlanList({ lessonPlans, selectedSubject }) {
  const filteredPlans =
    selectedSubject === "All Subjects"
      ? lessonPlans
      : lessonPlans.filter((plan) => plan.subject === selectedSubject);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPlans.map((plan) => (
        <LessonPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
