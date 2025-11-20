import { BookOpen, Users, Star, Clock } from 'lucide-react';

// Filters
export const DEPARTMENTS = [
  'All Departments',
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
];

export const STATUSES = ['All Status', 'active', 'upcoming'];

// Stats
export const STATS = [
  {
    title: 'Total Courses',
    value: '5',
    subtitle: '4 active this semester',
    icon: BookOpen,
  },
  {
    title: 'Total Students',
    value: '125',
    subtitle: '79% capacity utilization',
    icon: Users,
  },
  {
    title: 'Average Rating',
    value: '4.5',
    subtitle: 'Based on student feedback',
    icon: Star,
  },
  {
    title: 'Waitlisted',
    value: '18',
    subtitle: 'Students waiting for enrollment',
    icon: Clock,
  },
];

// Sample course data (same as in original code)
export const COURSES = [/* your courses array here */];
