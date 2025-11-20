import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from "sonner";
// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import LoadingSpinner from './components/LoadingSpinner';
import StudentDashboard from './pages/Students/StudentDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import PrincipalDashboard from './pages/Principal/PrincipalDashboard';
import ParentDashboard from './pages/Parents/ParentDashboard'
import AdminDashboard from './pages/Admin/AdminDashboard';
// Services
import authService from './services/authService';
import RecommendationPage from './pages/Students/AIRecommondation';
import StudentProfile from './pages/Students/StudentProfile';
import Sidebar from './pages/Students/Student_Sidebar';
import ClassScheduleApp from './pages/Students/StudentTimeTable';
import { AssignmentSystem } from './pages/Students/StudentAssigmentSystem';
import { CoursesManager } from './pages/Students/Studentcourse';
import { NotificationSystem } from './pages/Students/StudentNotiicationSystem';
import AdminUserManagement from './pages/Admin/AdminUserManage';
import Landing from './components/Landing';
import StudentDemo from './pages/Students/StudentDemo';
import InstitutionOnboarding from './pages/Institution/Institution_Onboard';
import EnhancedParentProfile from './pages/Parents/ParentProfile';
import { FeeDetails } from './pages/Parents/ParentFee';
import ParentChatRoom from './pages/Parents/ParentChatRoom';
import ParentTimetable from './pages/Parents/ParentTimeTable';
import ChatRoom from './pages/Students/StudentChat';
import TimetableManager from './pages/Admin/AdminTimeTableManger';
import AdminNotificationSystem from './pages/Admin/AdminAnnouncements';
import EventCalendar from './pages/Admin/AdminCalender';
import AdminReportGeneration from './pages/Admin/AdminReportGeneration';
import SystemSettings from './pages/Admin/AdminSystemSettings';
import StudentEventCalendar from './pages/Students/StudentCalendar';
import ParentEventCalendar from './pages/Parents/ParentCalendar';
import PrincipalAnalytics from './pages/Principal/PrincipalAnalytics';
import { StaffDirectory } from './pages/Principal/PrincipalStaffDirectory';
import AcademicProgress from './pages/Principal/PrincipalAcademicProgress';
import PrincipalEventCalendar from './pages/Principal/PrincipalCalendar';
import PrincipalProfile from './pages/Principal/PrincipalProfile';
import TeacherProfile from './pages/staff/TeacherProfile';
import TeacherCourseManagement from './pages/staff/TeacherCourseManagement - Copy';
import TeacherAssignment from './pages/staff/TeacherAssignment - Copy';
import TeacherStudentManagement from './pages/staff/TeacherStudentManagement';
import TeacherNotification from './pages/staff/TeacherNotification';
import TeacherLessonPlan from './pages/staff/TeacherLessonPlan - Copy';
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  const handleLogin = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <Routes>

          <Route
            path="/"

            element={<Landing />}
          />
          <Route
            path="/onBoard"
            element={<InstitutionOnboarding />}
          />

          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <DashboardRouter user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai-recommendation"
            element={user ? <RecommendationPage user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/timetable"
            element={user ? <ClassScheduleApp user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/parentCalendar"
            element={user ? <ParentEventCalendar user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/teacher/profile"
            element={user ? <TeacherProfile user={user} /> : <Navigate to="/login" />} />
            <Route
            path="/teacher/courses"
            element={user ? <TeacherCourseManagement user={user} /> : <Navigate to="/login" />} />
            <Route
            path="/teacher/"
            element={user ? <TeacherCourseManagement user={user} /> : <Navigate to="/login" />} />
            <Route
            path="/teacher/assignment"
            element={user ? <TeacherAssignment user={user} /> : <Navigate to="/login" />} />
            
            <Route
            path="/teacher/announcement"
            element={user ? <TeacherNotification user={user} /> : <Navigate to="/login" />} />
          
            <Route
            path="/teacher/lessonplan"
            element={user ? <TeacherLessonPlan user={user} /> : <Navigate to="/login" />} />
          
            <Route
            path="/teacher/students"
            element={user ? <TeacherStudentManagement user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/principal/analytics"
            element={user ? <PrincipalAnalytics user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/principal/staff"
            element={user ? <StaffDirectory user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/principal/academic"
            element={user ? <AcademicProgress user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/principal/calendar"
            element={user ? <PrincipalEventCalendar user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/principal/profile"
            element={user ? <PrincipalProfile user={user} /> : <Navigate to="/login" />} />

          <Route
            path="/parent_Profile"
            element={user ? <EnhancedParentProfile user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/fees"
            element={user ? <FeeDetails /> : <Navigate to="/login" />} />
          <Route
            path="/student_Profile"
            element={user ? <StudentProfile user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/studentCalendar"
            element={user ? <StudentEventCalendar user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_Chat"
            element={user ? <ChatRoom user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/admin/timetable"
            element={user ? <TimetableManager user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/admin/settings"
            element={user ? <SystemSettings user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/admin/announcements"
            element={user ? <AdminNotificationSystem user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/admin/calendar"
            element={user ? <EventCalendar user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/admin/reports"
            element={user ? <AdminReportGeneration user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/stud_assignment"
            element={user ? <AssignmentSystem user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/users"
            element={user ? <AdminUserManagement user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_course"
            element={user ? <CoursesManager user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/student_notification"
            element={user ? <NotificationSystem user={user} /> : <Navigate to="/login" />} />
          <Route
            path="/parentTimetable"
            element={user ? <ParentTimetable user={user} /> : <Navigate to="/login" />} />

          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
          <Route
            path="/chat"
            element={user ? <ParentChatRoom user={user} /> : <Navigate to="/login" />} />

        </Routes>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={3000} // how long toast stays (ms)
          toastOptions={{
            style: { borderRadius: "10px", padding: "12px 16px" },
            classNames: {
              toast: "animate-in slide-in-from-top fade-in duration-500",
              description: "text-sm opacity-90",
              actionButton: "bg-blue-600 text-white px-3 py-1 rounded-md",
            },
          }}
        />
      </div>
    </Router>

  );
}
const DashboardRouter = ({ user }) => {
  switch (user.user_type) {
    case 'student':
      return <StudentDashboard user={user} />;
    case 'staff':
      return <StaffDashboard user={user} />;
    case 'principal':
      return <PrincipalDashboard user={user} />;
    case 'parent':
      return <ParentDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    default:
      return <Navigate to="/login" />;
  }
};
export default App;