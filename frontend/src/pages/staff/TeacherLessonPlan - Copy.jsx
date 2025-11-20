import React, { useState } from 'react';
import TeacherSidebar from './TeacherSideBar1';
import LessonPlanList from './staffcomponents/LessonPlanList';
import Select from './staffcomponents/UI/Select';
import Button from './staffcomponents/UI/Button';
import { SUBJECTS } from './staffcomponents/utils/constants';
import NewLessonPlanModal from './staffcomponents/NewLessonPlanModal';
export default function TeacherLessonPlan() {
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonPlans, setLessonPlans] = useState([]); // store created lesson plans

  const handleAddLessonPlan = (newPlan) => {
    setLessonPlans([...lessonPlans, newPlan]); // add new plan
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TeacherSidebar />

      <main className="max-w-7xl mx-auto p-6 flex-1">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Plan Manager</h1>
          <p className="text-gray-600 mb-6">
            Create, manage, and organize your lesson plans
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Select
              options={SUBJECTS}
              value={selectedSubject}
              onChange={setSelectedSubject}
            />
            <Button onClick={() => setIsModalOpen(true)}>
              <span className="text-lg">+</span>
              <span>New Lesson Plan</span>
            </Button>
          </div>
        </header>

        {/* Lesson Plans */}
        <LessonPlanList
          selectedSubject={selectedSubject}
          lessonPlans={lessonPlans} // pass lesson plans down
        />
      </main>

      {/* Modal */}
      <NewLessonPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddLessonPlan}
      />
    </div>
  );
}
