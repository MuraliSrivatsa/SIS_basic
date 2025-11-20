import React from 'react';
import TeacherSidebar from './TeacherSideBar1';
import SearchBar from './staffcomponents/UI/SearchBar';
import StudentStats from './staffcomponents/StudentStats';
import StudentFormModal from './staffcomponents/StudentFormModal';
import StudentList from './staffcomponents/StudentList';
import useStudents from './staffcomponents/hooks/useStudents';

const TeacherStudentManagement = () => {
  const {
    students,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    showAddModal,
    setShowAddModal,
    editingStudent,
    setEditingStudent,
    newStudent,
    setNewStudent,
    getStatusColor,
    formatDate,
    handleAddStudent,
    handleEditStudent,
    handleUpdateStudent,
    handleDeleteStudent
  } = useStudents();

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <div className="flex-1 container bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Students</h1>
          <p className="text-gray-600">Manage student information and records</p>
        </div>

        {/* Student Directory */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Student Directory</h2>
            <p className="text-gray-600 text-sm">View and manage all student records</p>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddClick={() => setShowAddModal(true)}
          />

          <StudentList
            students={filteredStudents}
            onEdit={handleEditStudent}
            onDelete={handleDeleteStudent}
            formatDate={formatDate}
            getStatusColor={getStatusColor}
          />
        </div>

        <StudentFormModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Student"
          student={newStudent}
          setStudent={setNewStudent}
          onSubmit={handleAddStudent}
        />

        <StudentFormModal
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          title="Edit Student"
          student={editingStudent || { name: '', email: '', enrollmentDate: '', status: 'active', gpa: '' }}
          setStudent={setEditingStudent}
          onSubmit={handleUpdateStudent}
        />

        <StudentStats students={students} />
      </div>
    </div>
  );
};

export default TeacherStudentManagement;