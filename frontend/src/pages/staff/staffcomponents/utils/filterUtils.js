// filterUtils.js
export const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getEnrollmentColor = (status) => {
  switch (status) {
    case 'Good Enrollment':
      return 'bg-blue-500';
    case 'High Enrollment':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const filterCourses = (courses, searchTerm, departmentFilter, statusFilter) => {
  return courses.filter((course) => {
    const matchesSearch =
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'All Departments' || course.department === departmentFilter;

    const matchesStatus =
      statusFilter === 'All Status' || course.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });
};
