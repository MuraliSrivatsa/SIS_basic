import { useState } from 'react';
import { Plus} from 'lucide-react';

import TeacherSidebar from './TeacherSideBar1';
import StatCard from './staffcomponents/StatCard';
import FilterPanel from './staffcomponents/FilterPanel';
import CourseCard from './staffcomponents/CourseCard';

import stats from './staffcomponents/data/mockStats';
import courses from './staffcomponents/data/mockCourses';
import { filterCourses } from './staffcomponents/utils/filterUtils';

const TeacherCourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // ✅ Using the utility function instead of inline logic
  const filteredCourses = filterCourses(
    courses,
    searchTerm,
    departmentFilter,
    statusFilter
  );

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="container min-h-screen bg-gray-50 p-6 w-full">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Management</h1>
              <p className="text-gray-600">Manage your courses and track student enrollment</p>
            </div>
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Filters */}
          <FilterPanel
            searchTerm={searchTerm}
            departmentFilter={departmentFilter}
            statusFilter={statusFilter}
            setSearchTerm={setSearchTerm}
            setDepartmentFilter={setDepartmentFilter}
            setStatusFilter={setStatusFilter}
          />

          {/* Course Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
              Help & Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseManagement;
