import { useEffect, useState, useMemo } from 'react';

const useStudents = () => {
  // State variables
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    enrollmentDate: '',
    status: 'active',
    gpa: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch students once on mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/students'); // Update with your API
        if (!res.ok) throw new Error('Failed to fetch students');
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Filter students based on searchTerm (name, email, status)
  const filteredStudents = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return students.filter(({ name, email, status }) =>
      [name, email, status].some((field) =>
        field?.toLowerCase().includes(term)
      )
    );
  }, [students, searchTerm]);

  // Helper: format dates
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : '';

  // Helper: status badge color
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Add new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      alert('Please fill in required fields.');
      return;
    }

    const newEntry = {
      ...newStudent,
      id: (students.length + 1).toString(),
      gpa: Number(newStudent.gpa),
    };

    setStudents((prev) => [...prev, newEntry]);
    setShowAddModal(false);
    setNewStudent({ name: '', email: '', enrollmentDate: '', status: 'active', gpa: '' });
  };

  // Edit student (open modal)
  const handleEditStudent = (student) => setEditingStudent(student);

  // Update edited student
  const handleUpdateStudent = () => {
    if (!editingStudent) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === editingStudent.id ? editingStudent : s))
    );
    setEditingStudent(null);
  };

  // Delete student with confirmation
  const handleDeleteStudent = (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return {
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
    formatDate,
    getStatusColor,
    handleAddStudent,
    handleEditStudent,
    handleUpdateStudent,
    handleDeleteStudent,
    error,
    loading
  };
};

export default useStudents;
