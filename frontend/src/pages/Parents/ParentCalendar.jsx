import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, BookOpen, AlertCircle, Star } from "lucide-react"
import { toast } from "sonner";
import ParentSidebar from "./Parent_sidebar"
import Sidebar from "../../components/sidebars/Sidebar";

export default function ParentEventCalendar({ userRole, canEdit = false }) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [events, setEvents] = useState([])
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [viewMode, setViewMode] = useState("month")

    // Mock events
    useEffect(() => {
        const mockEvents = [
            {
                id: "1",
                title: "CS 201 - Data Structures",
                description: "Regular class session covering binary trees",
                date: "2025-09-04",
                startTime: "10:00",
                endTime: "11:00",
                location: "Room 204",
                type: "class",
                course: "CS 201",
                priority: "medium",
            },
            {
                id: "2",
                title: "Midterm Examination",
                description: "Mathematics midterm examination",
                date: "2025-09-06",
                startTime: "14:00",
                endTime: "16:00",
                location: "Exam Hall A",
                type: "exam",
                course: "MATH 301",
                priority: "high",
            },
        ]
        setEvents(mockEvents)
    }, [])

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()
        const days = []

        for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
        for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))
        return days
    }

    const getEventsForDate = (date) => {
        const dateString = date.toISOString().split("T")[0]
        return events.filter((event) => event.date === dateString)
    }

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const getEventTypeColor = (type) => {
        switch (type) {
            case "class":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "exam":
                return "bg-red-100 text-red-800 border-red-200"
            case "meeting":
                return "bg-purple-100 text-purple-800 border-purple-200"
            case "event":
                return "bg-green-100 text-green-800 border-green-200"
            case "holiday":
                return "bg-orange-100 text-orange-800 border-orange-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "high":
                return <AlertCircle className="h-3 w-3 text-red-500" />
            case "medium":
                return <Clock className="h-3 w-3 text-yellow-500" />
            case "low":
                return <Star className="h-3 w-3 text-green-500" />
            default:
                return null
        }
    }

    const navigateMonth = (direction) => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev)
            if (direction === "prev") newDate.setMonth(prev.getMonth() - 1)
            else newDate.setMonth(prev.getMonth() + 1)
            return newDate
        })
    }

    const days = getDaysInMonth(currentDate)
    const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    }
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
    }
    // inside EventCalendar component
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        type: "",
        priority: "medium",
    })

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.date) {
            toast.error("Title and Date are required")
            return
        }

        const eventToAdd = {
            ...newEvent,
            id: Date.now().toString(), // simple unique id
        }

        setEvents((prev) => [...prev, eventToAdd])
        toast.success("Event created successfully!")

        // reset form + close
        setNewEvent({
            title: "",
            description: "",
            date: "",
            startTime: "",
            endTime: "",
            location: "",
            type: "",
            priority: "medium",
        })
        setIsDialogOpen(false)
    }


    return (
        <div className="flex">
            <Sidebar role={"parent"}/>
            <motion.div className="container space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                {/* Header */}
                <motion.div className="flex items-center justify-between" variants={itemVariants}>
                    <div>
                        <motion.h1
                            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="mt-6 text-2xl font-bold"
                        >
                            Event Calendar
                        </motion.h1>
                        <p className="text-gray-500">Manage your academic schedule and important events</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                className={`px-3 py-1 rounded-md text-sm ${viewMode === "month" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
                                onClick={() => setViewMode("month")}
                            >
                                Month
                            </button>
                            <button
                                className={`px-3 py-1 rounded-md text-sm ${viewMode === "week" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
                                onClick={() => setViewMode("week")}
                            >
                                Week
                            </button>
                        </div>

                        {canEdit && (
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                            >
                                <Plus className="h-4 w-4" /> Add Event
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Calendar Navigation */}
                <motion.div variants={itemVariants} className="border rounded-lg shadow bg-white">
                    <div className="flex items-center justify-between p-4 border-b">
                        <button onClick={() => navigateMonth("prev")} className="p-2 border rounded hover:bg-gray-100">
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Calendar className="h-5 w-5" /> {monthYear}
                        </h2>
                        <button onClick={() => navigateMonth("next")} className="p-2 border rounded hover:bg-gray-100">
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-4 space-y-4">
                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Days */}
                        <motion.div className="grid grid-cols-7 gap-1" variants={containerVariants}>
                            {days.map((day, index) => {
                                if (!day) return <div key={`empty-${index}`} className="p-2 h-24" />
                                const dayEvents = getEventsForDate(day)
                                const isToday = day.toDateString() === new Date().toDateString()
                                const isSelected = selectedDate?.toDateString() === day.toDateString()

                                return (
                                    <motion.div
                                        key={day.toDateString()}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`p-2 h-24 border rounded-lg cursor-pointer transition-all ${isToday ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
                                            } ${isSelected ? "ring-2 ring-blue-500" : ""} hover:shadow-md`}
                                        onClick={() => setSelectedDate(day)}
                                    >
                                        <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-900"}`}>
                                            {day.getDate()}
                                        </div>
                                        <div className="space-y-1">
                                            {dayEvents.slice(0, 2).map((event) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className={`text-xs px-1 py-0.5 rounded border truncate ${getEventTypeColor(event.type)}`}
                                                    title={event.title}
                                                >
                                                    <div className="flex items-center gap-1">
                                                        {getPriorityIcon(event.priority)}
                                                        <span className="truncate">{event.title}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {dayEvents.length > 2 && (
                                                <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    </div>
                </motion.div>


                {/* Selected Date Events */}
                {selectedDate && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                        <div className="border rounded-lg bg-white shadow">
                            <div className="p-4 border-b font-semibold flex items-center gap-2">
                                <Calendar className="h-5 w-5" /> Events for {formatDate(selectedDate)}
                            </div>
                            <div className="p-4 space-y-4">
                                {getEventsForDate(selectedDate).length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">No events scheduled for this date</p>
                                ) : (
                                    getEventsForDate(selectedDate).map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-medium flex items-center gap-2">
                                                        {getPriorityIcon(event.priority)}
                                                        {event.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">{event.description}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>{event.type}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" /> {event.startTime} - {event.endTime}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" /> {event.location}
                                                </div>
                                                {event.course && (
                                                    <div className="flex items-center gap-1">
                                                        <BookOpen className="h-4 w-4" /> {event.course}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Upcoming Events */}
                <motion.div variants={itemVariants}>
                    <div className="border rounded-lg bg-white shadow">
                        <div className="p-4 border-b">
                            <h3 className="font-semibold flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" /> Upcoming Events
                            </h3>
                            <p className="text-gray-500 text-sm">Events scheduled for the next 7 days</p>
                        </div>
                        <div className="p-4 space-y-3">
                            {events
                                .filter((event) => {
                                    const eventDate = new Date(event.date)
                                    const today = new Date()
                                    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                                    return eventDate >= today && eventDate <= nextWeek
                                })
                                .slice(0, 5)
                                .map((event, index) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-white to-blue-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            {getPriorityIcon(event.priority)}
                                            <div>
                                                <p className="font-medium">{event.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(event.date).toLocaleDateString()} at {event.startTime}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>{event.type}</span>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </motion.div>

                {/* Simple Add Event Modal */}
                {isDialogOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">Create New Event</h2>
                            <div className="space-y-3">
                                <input id="title" placeholder="Event Title" className="w-full border px-3 py-2 rounded" />
                                <textarea id="description" placeholder="Description" className="w-full border px-3 py-2 rounded" />
                                <input id="date" type="date" className="w-full border px-3 py-2 rounded" />
                                <input id="location" placeholder="Location" className="w-full border px-3 py-2 rounded" />
                                <div className="grid grid-cols-2 gap-2">
                                    <input id="startTime" type="time" className="w-full border px-3 py-2 rounded" />
                                    <input id="endTime" type="time" className="w-full border px-3 py-2 rounded" />
                                </div>
                                <select id="type" className="w-full border px-3 py-2 rounded">
                                    <option value="">Select Type</option>
                                    <option value="class">Class</option>
                                    <option value="exam">Exam</option>
                                    <option value="meeting">Meeting</option>
                                    <option value="event">Event</option>
                                    <option value="holiday">Holiday</option>
                                </select>
                                <div className="flex justify-end gap-2 pt-2">
                                    <button onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded hover:bg-gray-100">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            toast.success("Event created successfully!")
                                            setIsDialogOpen(false)
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </motion.div>
        </div>
    )
}
