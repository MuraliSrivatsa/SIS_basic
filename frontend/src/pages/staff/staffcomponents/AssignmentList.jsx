import React, { useState } from 'react';
import AssignmentCard from './AssignmentCard';
import AssignmentModal from './AssignmentModal';
import AssignmentView from './AssignmentView';

export default function AssignmentList({ initialAssignments }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  
  // State for Update Modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // State for View Modal
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewedAssignment, setViewedAssignment] = useState(null);

  const handleUpdateClick = (assignment) => {
    setSelectedAssignment(assignment);
    setUpdateModalOpen(true);
  };

  const handleViewClick = (assignment) => {
    setViewedAssignment(assignment);
    setViewModalOpen(true);
  };

  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setViewedAssignment(null);
  };

  const handleSave = (updatedAssignment) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.title === updatedAssignment.title ? { ...a, ...updatedAssignment } : a
      )
    );
    handleUpdateModalClose();
  };

  const handleDelete = (assignmentToDelete) => {
    setAssignments((prev) => prev.filter(a => a.title !== assignmentToDelete.title));
  };

  return (
    <>
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.title}
          assignment={assignment}
          onView={() => handleViewClick(assignment)}
          onUpdate={() => handleUpdateClick(assignment)}
          onDelete={() => handleDelete(assignment)}
        />
      ))}

      {/* Update Modal */}
      <AssignmentModal
        isOpen={updateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleSave}
        assignment={selectedAssignment}
      />

      {/* View Modal */}
      <AssignmentView
        isOpen={viewModalOpen}
        onClose={handleViewModalClose}
        assignment={viewedAssignment}
      />
    </>
  );
}
