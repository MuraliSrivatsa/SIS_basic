import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParentSidebar from "./Parent_sidebar";
import Sidebar from "../../components/sidebars/Sidebar";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday","saturday"];
const timeSlots = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
];

const ParentTimetable = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    fetch("/api/class-schedule/")
      .then((res) => res.json())
      .then((data) => setScheduleData(data))
      .catch(() => {});
  }, []);

  // Organize schedule by day and time
  const scheduleMap = daysOfWeek.reduce((acc, day) => {
    acc[day] = {};
    return acc;
  }, {});

  scheduleData.forEach((item) => {
    const day = item.day_of_week;
    if (!scheduleMap[day]) return;
    const timeRange = `${item.time_start.slice(0, 5)}-${item.time_end.slice(0, 5)}`;
    scheduleMap[day][timeRange] = item;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={"parent"}/>
      <main className="flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            📅 Class Schedule
          </h1>
          <p className="text-gray-600 mb-6">
            Here’s your weekly timetable with all classes and timings.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border border-gray-200 rounded-xl shadow-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="p-3 text-center font-semibold">Time</th>
                  {daysOfWeek.map((day) => (
                    <th key={day} className="p-3 text-center font-semibold">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, i) => (
                  <tr
                    key={time}
                    className={`${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="p-3 text-sm font-semibold bg-gray-100 text-center w-28 text-gray-700">
                      {time}
                    </td>
                    {daysOfWeek.map((day) => {
                      const classItem = scheduleMap[day]?.[time];
                      return (
                        <td key={day} className="p-2 text-center align-top">
                          {classItem ? (
                            <ClassBlock classItem={classItem} />
                          ) : (
                            <div className="h-20 rounded-lg border border-dashed border-gray-300 bg-gray-50"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const ClassBlock = ({ classItem }) => {
  const {
    course_code,
    course_name,
    time_start,
    time_end,
    room,
    instructor,
    students_count,
  } = classItem;
  const timeRange = `${time_start.slice(0, 5)} - ${time_end.slice(0, 5)}`;

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-lg p-2 h-20 shadow-md flex flex-col justify-between hover:scale-[1.02] transition-transform">
      <div className="font-semibold truncate text-sm">
        {course_code} - {course_name}
      </div>
      <div className="text-xs opacity-90">🕒 {timeRange}</div>
      <div className="text-xs opacity-90">📍 {room}</div>
      <div className="text-xs opacity-90">👨‍🏫 {instructor}</div>
      <div className="text-xs opacity-90">👥 {students_count} students</div>
    </div>
  );
};

export default ParentTimetable;
