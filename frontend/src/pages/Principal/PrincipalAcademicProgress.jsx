import { FaCalendarAlt, FaUsers, FaDoorOpen, FaClipboardList } from "react-icons/fa";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import PrincipalSidebar from "./PrincipalSideBar";
import Sidebar from "../../components/sidebars/Sidebar";

export default function AcademicProgress() {
  const exams = [
    {
      id: 1,
      title: "Science Quiz",
      type: "quiz",
      subject: "Physics",
      grade: "Grade 11",
      teacher: "Dr. Maria Rodriguez",
      date: "Tue, Oct 22",
      time: "02:00 PM",
      venue: "Physics Lab",
      duration: "60 minutes",
      marks: 50,
      students: 85,
      syllabus: ["Mechanics", "Waves"],
      daysRemaining: -317,
    },
    {
      id: 2,
      title: "English Literature Test",
      type: "test",
      subject: "English",
      grade: "Grade 12",
      teacher: "Ms. Sarah Williams",
      date: "Wed, Oct 23",
      time: "10:30 AM",
      venue: "Room 201",
      duration: "120 minutes",
      marks: 75,
      students: 95,
      syllabus: ["Shakespeare", "Modern Poetry", "Essay Writing"],
      daysRemaining: -316,
    },
    {
      id: 3,
      title: "History Assignment Submission",
      type: "assignment",
      subject: "History",
      grade: "Grade 9",
      teacher: "Mr. David Brown",
      date: "Thu, Oct 24",
      time: "11:59 PM",
      venue: "Online Submission",
      duration: "No time limit",
      marks: 60,
      students: 110,
      syllabus: ["World War II", "Research Methods"],
      daysRemaining: -315,
    },
    {
      id: 4,
      title: "Midterm Examination",
      type: "exam",
      subject: "Mathematics",
      grade: "Grade 10",
      teacher: "Prof. Robert Johnson",
      date: "Fri, Oct 25",
      time: "09:00 AM",
      venue: "Main Hall",
      duration: "180 minutes",
      marks: 100,
      students: 120,
      syllabus: ["Algebra", "Geometry", "Trigonometry"],
      daysRemaining: -314,
    },
    {
      id: 5,
      title: "Chemistry Practical Exam",
      type: "exam",
      subject: "Chemistry",
      grade: "Grade 11",
      teacher: "Dr. James Wilson",
      date: "Sat, Oct 26",
      time: "01:00 PM",
      venue: "Chemistry Lab",
      duration: "150 minutes",
      marks: 80,
      students: 78,
      syllabus: ["Organic Chemistry", "Lab Techniques"],
      daysRemaining: -313,
    },
    {
      id: 6,
      title: "Biology Unit Test",
      type: "test",
      subject: "Biology",
      grade: "Grade 10",
      teacher: "Dr. Lisa Anderson",
      date: "Mon, Oct 28",
      time: "11:00 AM",
      venue: "Room 105",
      duration: "90 minutes",
      marks: 65,
      students: 102,
      syllabus: ["Cell Biology", "Genetics"],
      daysRemaining: -312,
    },
  ];

  return (
    <div className="flex">
        <Sidebar role={"principal"}/>
    <div className="container p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Upcoming Exams & Tests</h1>
          <p className="text-gray-500">Monitor and manage all scheduled assessments</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          + Schedule New
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 shadow rounded-md flex flex-col items-center">
          <FaClipboardList className="text-red-500 text-2xl mb-2" />
          <p className="text-2xl font-semibold">6</p>
          <p className="text-gray-500">This Week</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md flex flex-col items-center">
          <FaCalendarAlt className="text-blue-500 text-2xl mb-2" />
          <p className="text-2xl font-semibold">6</p>
          <p className="text-gray-500">Total Scheduled</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md flex flex-col items-center">
          <FaUsers className="text-red-500 text-2xl mb-2" />
          <p className="text-2xl font-semibold">590</p>
          <p className="text-gray-500">Students Affected</p>
        </div>
        <div className="bg-white p-6 shadow rounded-md flex flex-col items-center">
          <FaDoorOpen className="text-gray-500 text-2xl mb-2" />
          <p className="text-2xl font-semibold">6</p>
          <p className="text-gray-500">Venues Required</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white">All</button>
        <button className="px-4 py-2 rounded-md border">This Week</button>
        <button className="px-4 py-2 rounded-md border">This Month</button>
        <button className="px-4 py-2 rounded-md border">All Types</button>
      </div>

      {/* Exam List */}
      <div className="space-y-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white shadow rounded-md p-6 flex flex-col md:flex-row justify-between"
          >
            {/* Left */}
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                {exam.title}
                <span className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800">
                  {exam.type}
                </span>
              </h3>
              <p className="text-sm text-gray-500">
                {exam.subject} • {exam.grade} • {exam.teacher}
              </p>
              <div className="flex gap-6 text-sm text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {exam.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {exam.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {exam.venue}
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold">Exam Details</h4>
                <p>Duration: {exam.duration}</p>
                <p>Max Marks: {exam.marks}</p>
                <p>Students: {exam.students}</p>
                <p className="text-gray-500 text-sm">📌 Scheduled</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between items-end mt-4 md:mt-0">
              <div>
                <h4 className="font-semibold">Syllabus Coverage</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {exam.syllabus.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 border rounded-md text-sm">Edit</button>
                <button className="px-3 py-1 border rounded-md text-sm">View Details</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                  Send Reminder
                </button>
              </div>
              <span className="mt-2 text-red-500 text-sm">
                {exam.daysRemaining} days
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
