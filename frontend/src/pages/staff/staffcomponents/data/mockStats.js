import { BookOpen, Users, Star, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Total Courses',
    value: '5',
    subtitle: '4 active this semester',
    Icon: BookOpen,
  },
  {
    title: 'Total Students',
    value: '125',
    subtitle: '79% capacity utilization',
    Icon: Users,
  },
  {
    title: 'Average Rating',
    value: '4.5',
    subtitle: 'Based on student feedback',
    Icon: Star,
  },
  {
    title: 'Waitlisted',
    value: '18',
    subtitle: 'Students waiting for enrollment',
    Icon: Clock,
  },
];

export default stats;
