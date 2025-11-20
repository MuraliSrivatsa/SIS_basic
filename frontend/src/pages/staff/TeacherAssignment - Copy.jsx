import React, { useState } from 'react';
import PageHeader from './staffcomponents/PageHeader';
import AssignmentCard from './staffcomponents/AssignmentCard';
import AssignmentModal from './staffcomponents/AssignmentModal';
import AssignmentView from './staffcomponents/AssignmentView';
import TeacherSidebar from './TeacherSideBar1';

export default function TeacherAssignment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [assignments, setAssignments] = useState([
    {
      title: 'Data Structures Project',
      course: 'Data Structures',
      teacher: 'Dr. Sarah Smith',
      type: 'Project',
      status: 'Overdue',
      description: 'Implement a binary search tree with full CRUD operations',
      dueDate: 'Oct 30, 2024',
      dueTime: '23:59',
      maxPoints: 100,
      submissions: '28/32',
      submissionCount: 28,
      progress: 87.5,
      grade: '88/100',
      feedback: 'Good implementation, but missing edge case handling.',
      tags: ['BST', 'CRUD'],
      attachments: [{ name: 'Spec.pdf', size: '1MB' }]
    },
    {
      title: 'Algorithm Analysis Quiz',
      course: 'Data Structures',
      teacher: 'Dr. Sarah Smith',
      type: 'Quiz',
      status: 'Overdue',
      description: 'Multiple choice quiz on Big O notation and complexity analysis',
      dueDate: 'Oct 25, 2024',
      dueTime: '22:00',
      maxPoints: 50,
      submissions: '30/32',
      submissionCount: 30,
      progress: 93.75,
      tags: ['Big O', 'Analysis'],
      attachments: []
    }
  ]);

  const handleSave = (assignmentData) => {
    setAssignments((prev) => [...prev, assignmentData]);
    setIsModalOpen(false);
  };

  const handleUpdate = (index) => {
    const updatedTitle = prompt('Enter new title:', assignments[index].title);
    if (updatedTitle) {
      setAssignments((prev) =>
        prev.map((assignment, i) =>
          i === index ? { ...assignment, title: updatedTitle } : assignment
        )
      );
    }
  };

  const handleDelete = (index) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleView = (index) => {
    setSelectedAssignment(assignments[index]);
    setIsViewOpen(true);
  };

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <PageHeader
          title="Assignment Management"
          subtitle="Create and manage assignments for your courses"
          buttonText="Create Assignment"
          onButtonClick={() => setIsModalOpen(true)}
        />

        {assignments.map((assignment, index) => (
          <AssignmentCard
            key={index}
            assignment={assignment}
            onUpdate={() => handleUpdate(index)}
            onDelete={() => handleDelete(index)}
            onView={() => handleView(index)}
          />
        ))}

        <AssignmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />

        <AssignmentView
          assignment={selectedAssignment}
          onClose={() => setIsViewOpen(false)}
          isOpen={isViewOpen}
        />
      </div>
    </div>
  );
}
