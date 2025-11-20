import React from 'react';
import PropTypes from 'prop-types';
import { GraduationCap, Trophy, BookOpen, Clock } from 'lucide-react';
import StatsCard from './StatsCard';
import CoursePerformanceChart from './CoursePerformanceChart';

const TeacherAnalytics = ({ analyticsData = {}, coursePerformance = [] }) => {
  // Default values for analyticsData to prevent undefined errors
  const {
    totalStudents = 0,
    avgClassScore = 0,
    courseCompletion = 0,
    teachingHours = 0,
    trends = { students: 'N/A', score: 'N/A', completion: 'N/A', hours: 'N/A' },
  } = analyticsData;

  const stats = [
    {
      icon: GraduationCap,
      title: 'Total Students',
      value: totalStudents,
      trend: trends.students,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Trophy,
      title: 'Average Class Score',
      value: avgClassScore,
      trend: trends.score,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: BookOpen,
      title: 'Course Completion',
      value: `${courseCompletion}%`,
      trend: trends.completion,
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Clock,
      title: 'Teaching Hours',
      value: teachingHours,
      trend: trends.hours,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      {analyticsData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              color={stat.color}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading analytics data...</div>
      )}
      <CoursePerformanceChart coursePerformance={coursePerformance} />
    </div>
  );
};

TeacherAnalytics.propTypes = {
  analyticsData: PropTypes.shape({
    totalStudents: PropTypes.number,
    avgClassScore: PropTypes.number,
    courseCompletion: PropTypes.number,
    teachingHours: PropTypes.number,
    trends: PropTypes.shape({
      students: PropTypes.string,
      score: PropTypes.string,
      completion: PropTypes.string,
      hours: PropTypes.string,
    }),
  }),
  coursePerformance: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.string.isRequired,
      avgScore: PropTypes.number.isRequired,
      passRate: PropTypes.number.isRequired,
    })
  ),
};

TeacherAnalytics.defaultProps = {
  analyticsData: {},
  coursePerformance: [],
};

export default TeacherAnalytics;