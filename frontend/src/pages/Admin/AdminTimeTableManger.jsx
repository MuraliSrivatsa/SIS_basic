import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Plus, Edit2, Trash2, Calendar, Users, MapPin, Clock, BookOpen, Settings } from "lucide-react";
import Sidebar from "../../components/sidebars/Sidebar";

export default function TimetableManager({ userRole }) {
  const [timetable, setTimetable] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "08:00-09:00", "09:00-10:00", "10:00-11:00",
    "11:00-12:00", "12:00-13:00", "13:00-14:00",
    "14:00-15:00", "15:00-16:00", "16:00-17:00"
  ];

  const departments = [
    { id: "all", name: "All Departments", color: "bg-gray-600" },
    { id: "cs", name: "Computer Science", color: "bg-blue-600" },
    { id: "math", name: "Mathematics", color: "bg-green-600" },
    { id: "physics", name: "Physics", color: "bg-red-600" },
    { id: "chemistry", name: "Chemistry", color: "bg-yellow-600" },
    { id: "english", name: "English", color: "bg-indigo-600" }
  ];

  const getDepartmentColor = (deptId) => {
    return departments.find(d => d.id === deptId)?.color || "bg-gray-500";
  };

  useEffect(() => {
    const mockTimetable = {
      Monday: [
        {
          id: "1",
          startTime: "09:00",
          endTime: "10:00",
          course: "CS 201 - Data Structures",
          instructor: "Dr. Smith",
          room: "Room 204",
          students: 32,
          day: "Monday",
          department: "cs"
        },
        {
          id: "2",
          startTime: "11:00",
          endTime: "12:00",
          course: "MATH 301 - Linear Algebra",
          instructor: "Prof. Johnson",
          room: "Room 101",
          students: 28,
          day: "Monday",
          department: "math"
        }
      ],
      Tuesday: [
        {
          id: "3",
          startTime: "10:00",
          endTime: "11:00",
          course: "PHYS 201 - Quantum Mechanics",
          instructor: "Dr. Wilson",
          room: "Lab 305",
          students: 24,
          day: "Tuesday",
          department: "physics"
        }
      ],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    };
    setTimetable(mockTimetable);
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination || !isEditMode) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const day = source.droppableId;
      const items = Array.from(timetable[day] || []);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setTimetable((prev) => ({ ...prev, [day]: items }));
    } else {
      const sourceDay = source.droppableId;
      const destDay = destination.droppableId;
      const sourceItems = Array.from(timetable[sourceDay] || []);
      const destItems = Array.from(timetable[destDay] || []);
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.day = destDay;
      destItems.splice(destination.index, 0, movedItem);
      setTimetable((prev) => ({
        ...prev,
        [sourceDay]: sourceItems,
        [destDay]: destItems
      }));
    }
  };

  const addNewSlot = (day) => {
    setSelectedSlot({
      id: Date.now().toString(),
      startTime: "",
      endTime: "",
      course: "",
      instructor: "",
      room: "",
      students: 0,
      day,
      department: "cs"
    });
    setIsDialogOpen(true);
  };

  const editSlot = (slot) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  const deleteSlot = (day, slotId) => {
    setTimetable((prev) => ({
      ...prev,
      [day]: prev[day]?.filter((slot) => slot.id !== slotId) || []
    }));
  };

  const saveSlot = (slotData) => {
    if (!selectedSlot) return;
    const newSlot = { ...selectedSlot, ...slotData };

    if (timetable[newSlot.day]?.some((slot) => slot.id === newSlot.id)) {
      setTimetable((prev) => ({
        ...prev,
        [newSlot.day]: prev[newSlot.day].map((slot) =>
          slot.id === newSlot.id ? newSlot : slot
        )
      }));
    } else {
      setTimetable((prev) => ({
        ...prev,
        [newSlot.day]: [...(prev[newSlot.day] || []), newSlot]
      }));
    }
    setIsDialogOpen(false);
    setSelectedSlot(null);
  };

  const filteredTimetable = () => {
    if (selectedDepartment === "all") return timetable;

    const filtered = {};
    Object.keys(timetable).forEach(day => {
      filtered[day] = timetable[day].filter(slot => slot.department === selectedDepartment);
    });
    return filtered;
  };

  return (
    <div className="flex">
      <Sidebar role={"admin"}/>
      <div className="container">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Timetable Management</h1>
                <p className="text-gray-500 text-sm">Organize and manage class schedules</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`px-5 py-2 rounded-md font-medium text-sm text-white ${isEditMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                {isEditMode ? "Save Changes" : "Edit Mode"}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* Time Column */}
              <div className="flex-shrink-0 w-40">
                <div className="sticky top-0 z-10 bg-gray-800 text-white font-medium text-center py-3 rounded-md mb-2">
                  Time Slots
                </div>
                <div className="space-y-2">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      className="bg-white border border-gray-200 px-3 py-4 text-xs font-medium text-center rounded-md text-gray-700"
                      style={{ minHeight: '80px' }}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {/* Days */}
              {days.map((day) => (
                <div key={day} className="flex-1 min-w-[240px]">
                  <div className="sticky top-0 z-10 mb-2">
                    <div className="bg-gray-200 text-gray-800 font-semibold text-center py-3 rounded-md flex items-center justify-between px-3">
                      <span>{day}</span>
                      {isEditMode && (
                        <button
                          onClick={() => addNewSlot(day)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <Plus size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  <Droppable droppableId={day} isDropDisabled={!isEditMode}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[500px] rounded-md p-3 space-y-2 transition ${snapshot.isDraggingOver
                          ? "bg-indigo-50 border border-dashed border-indigo-400"
                          : "bg-white border border-gray-200"
                          }`}
                      >
                        {(filteredTimetable()[day] || []).map((slot, index) => (
                          <Draggable key={slot.id} draggableId={slot.id} index={index} isDragDisabled={!isEditMode}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-[1.02] border overflow-hidden"
                              >
                                {/* Department strip */}
                                <div className={`h-2 ${getDepartmentColor(slot.department)} w-full`} />

                                <div className="p-4">
                                  {/* Header */}
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-900">{slot.course}</h3>
                                      <p className="text-xs text-gray-500">
                                        {departments.find(d => d.id === slot.department)?.name}
                                      </p>
                                    </div>

                                    {isEditMode && (
                                      <div className="flex space-x-2">
                                        <button
                                          onClick={() => editSlot(slot)}
                                          className="text-blue-600 hover:text-blue-800 transition"
                                        >
                                          <Edit2 size={16} />
                                        </button>
                                        <button
                                          onClick={() => deleteSlot(day, slot.id)}
                                          className="text-red-600 hover:text-red-800 transition"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  {/* Details */}
                                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                      <Clock size={16} className="text-gray-500" />
                                      <span>{slot.startTime} - {slot.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <BookOpen size={16} className="text-gray-500" />
                                      <span>{slot.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <MapPin size={16} className="text-gray-500" />
                                      <span>{slot.room}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Users size={16} className="text-gray-500" />
                                      <span>{slot.students} students</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>

                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
            {isDialogOpen && selectedSlot && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedSlot.course ? "Edit Class" : "Add New Class"}
                    </h2>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <input id="course" placeholder="Course Name" defaultValue={selectedSlot.course} className="w-full border px-4 py-2 rounded-lg" />
                    <input id="instructor" placeholder="Instructor" defaultValue={selectedSlot.instructor} className="w-full border px-4 py-2 rounded-lg" />

                    <div className="grid grid-cols-2 gap-4">
                      <input id="startTime" type="time" defaultValue={selectedSlot.startTime} className="border px-4 py-2 rounded-lg" />
                      <input id="endTime" type="time" defaultValue={selectedSlot.endTime} className="border px-4 py-2 rounded-lg" />
                    </div>

                    <input id="room" placeholder="Room" defaultValue={selectedSlot.room} className="w-full border px-4 py-2 rounded-lg" />

                    <div className="grid grid-cols-2 gap-4">
                      <input id="students" type="number" placeholder="Students" defaultValue={selectedSlot.students} className="border px-4 py-2 rounded-lg" />
                      <select id="department" defaultValue={selectedSlot.department} className="border px-4 py-2 rounded-lg">
                        {departments.slice(1).map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setIsDialogOpen(false)} className="flex-1 px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">Cancel</button>
                    <button
                      onClick={() => {
                        const course = document.getElementById("course").value;
                        const instructor = document.getElementById("instructor").value;
                        const startTime = document.getElementById("startTime").value;
                        const endTime = document.getElementById("endTime").value;
                        const room = document.getElementById("room").value;
                        const students = parseInt(document.getElementById("students").value || "0", 10);
                        const department = document.getElementById("department").value;
                        saveSlot({ course, instructor, startTime, endTime, room, students, department });
                      }}
                      className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
