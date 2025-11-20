export const USER_TYPES = {
  STUDENT: 'student',
  STAFF: 'staff',
  PRINCIPAL: 'principal',
  PARENT: 'parent',
  ADMIN: 'admin'
 };
 export const GRADE_LEVELS = {
  9: 'Grade 9',
  10: 'Grade 10',
  11: 'Grade 11',
  12: 'Grade 12'
 };
 export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
  LATE: 'late',
  EXCUSED: 'excused'
 };
 export const ALERT_TYPES = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info'
 };
 export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    PROFILE: '/auth/profile/'
  },
  STUDENTS: {
    LIST: '/students/',
    DASHBOARD: '/students/dashboard/',
    ANALYTICS: '/students/performance_analytics/'
  },
  COURSES: {
    LIST: '/courses/'
  }
 };