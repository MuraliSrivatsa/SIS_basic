import { useState, useEffect, useRef } from "react"
import {
    MessageSquare,
    Send,
    Users,
    Search,
    Phone,
    Video,
    MoreVertical,
    File,
    Image,
    Smile,
} from "lucide-react"
import { toast } from "sonner"
import ParentSidebar from "./Parent_sidebar"
import Sidebar from "../../components/sidebars/Sidebar"

export default function ParentChatRoom({ userName = "Parent User", userId = "PAR001" }) {
    const [chatRooms, setChatRooms] = useState([])
    const [messages, setMessages] = useState([])
    const [selectedChatRoom, setSelectedChatRoom] = useState("")
    const [newMessage, setNewMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const messagesEndRef = useRef(null)

    // Mock Parent-Specific Data
    useEffect(() => {
        const parentChatRooms = [
            {
                id: "P1",
                name: "Parent-Teacher Meeting",
                description: "Discuss your child’s academic progress and concerns",
                type: "academic",
                participants: ["PAR001", "PROF001", "PRIN001"],
                unreadCount: 2,
            },
            {
                id: "P2",
                name: "School Announcements (Parents)",
                description: "Important updates for parents – fees, exams, holidays",
                type: "announcement",
                participants: ["PAR001", "PRIN001", "ADM001"],
                unreadCount: 1,
            },
            {
                id: "P3",
                name: "Parent Support",
                description: "Counseling and support for parents regarding students",
                type: "support",
                participants: ["PAR001", "COUN001", "ADM001"],
                unreadCount: 0,
            },
            {
                id: "P4",
                name: "Parent Community",
                description: "Connect with other parents for events and discussions",
                type: "general",
                participants: ["PAR001", "PAR002", "PAR003"],
                unreadCount: 3,
            },
        ]

        const parentMessages = [
            {
                id: "M1",
                senderId: "PRIN001",
                senderName: "Dr. Margaret Wilson",
                senderRole: "principal",
                content:
                    "Reminder: Parent-teacher meetings will be held on Sept 10th.",
                timestamp: "2024-09-01T09:00:00Z",
                chatRoomId: "P1",
                type: "text",
            },
            {
                id: "M2",
                senderId: "PAR001",
                senderName: "Mrs. Johnson",
                senderRole: "parent",
                content: "Thank you, will the meetings be online or offline?",
                timestamp: "2024-09-01T09:15:00Z",
                chatRoomId: "P1",
                type: "text",
            },
            {
                id: "M3",
                senderId: "PROF001",
                senderName: "Mr. Anderson",
                senderRole: "teacher",
                content: "They will be conducted in-person at the school auditorium.",
                timestamp: "2024-09-01T09:20:00Z",
                chatRoomId: "P1",
                type: "text",
            },
            {
                id: "M4",
                senderId: "ADM001",
                senderName: "School Admin",
                senderRole: "admin",
                content:
                    "Fee payment deadline for Term 2 is Sept 15th. Please clear dues.",
                timestamp: "2024-09-01T08:30:00Z",
                chatRoomId: "P2",
                type: "text",
            },
        ]

        setChatRooms(parentChatRooms)
        setMessages(parentMessages)
        if (parentChatRooms.length > 0) setSelectedChatRoom(parentChatRooms[0].id)
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, selectedChatRoom])

    const sendMessage = () => {
        if (!newMessage.trim() || !selectedChatRoom) return
        const message = {
            id: Date.now().toString(),
            senderId: userId,
            senderName: userName,
            senderRole: "parent",
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            chatRoomId: selectedChatRoom,
            type: "text",
        }
        setMessages((prev) => [...prev, message])
        setNewMessage("")
        toast.success("Message sent!")
    }

    const filteredChatRooms = chatRooms.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const currentRoomMessages = messages.filter(
        (msg) => msg.chatRoomId === selectedChatRoom
    )
    const currentRoom = chatRooms.find((room) => room.id === selectedChatRoom)

    const getRoleColor = (role) => {
        switch (role) {
            case "teacher":
                return "bg-blue-100 text-blue-800"
            case "student":
                return "bg-green-100 text-green-800"
            case "parent":
                return "bg-purple-100 text-purple-800"
            case "principal":
                return "bg-red-100 text-red-800"
            case "admin":
                return "bg-orange-100 text-orange-800"
            case "counselor":
                return "bg-teal-100 text-teal-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatTime = (timestamp) =>
        new Date(timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })

    const formatDate = (timestamp) => {
        const date = new Date(timestamp)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        if (date.toDateString() === today.toDateString()) return "Today"
        if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }

    return (
        <div className="flex">
            <Sidebar role={"parent"}/>
            <div className="container space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold">Parent Communication Hub</h1>
                    <p className="text-gray-500">
                        Stay updated and connect with teachers, principals, and other parents
                    </p>
                </div>


                {/* Stats */}
                <div className="grid gap-3 md:grid-cols-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
                        <p className="text-xs text-gray-500">Active Rooms</p>
                        <p className="text-lg font-semibold">{chatRooms.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
                        <p className="text-xs text-gray-500">Unread</p>
                        <p className="text-lg font-semibold text-red-600">
                            {chatRooms.reduce((s, r) => s + r.unreadCount, 0)}
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
                        <p className="text-xs text-gray-500">Today</p>
                        <p className="text-lg font-semibold">
                            {
                                messages.filter(
                                    (m) =>
                                        new Date(m.timestamp).toDateString() ===
                                        new Date().toDateString()
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
                        <p className="text-xs text-gray-500">Online Parents</p>
                        <p className="text-lg font-semibold text-green-600">12</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
                    {/* Chat Rooms */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border space-y-3">
                            <h2 className="text-sm font-semibold">Chat Rooms</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 w-full border rounded-lg h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 max-h-[500px] overflow-y-auto">
                            {filteredChatRooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => setSelectedChatRoom(room.id)}
                                    className={`p-3 cursor-pointer border rounded-lg transition ${selectedChatRoom === room.id
                                        ? "bg-blue-50 border-blue-500 shadow-sm"
                                        : "bg-white dark:bg-gray-800"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-sm truncate">{room.name}</h4>
                                        {room.unreadCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                {room.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mb-2">
                                        {room.description}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span className="px-2 py-0.5 border rounded">{room.type}</span>
                                        <div className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            <span>{room.participants.length}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow border flex flex-col">
                        {currentRoom ? (
                            <>
                                <div className="flex items-center justify-between p-4 border-b">
                                    <div>
                                        <h2 className="font-semibold text-lg">{currentRoom.name}</h2>
                                        <p className="text-sm text-gray-500">
                                            {currentRoom.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded">
                                            <Phone className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded">
                                            <Video className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {currentRoomMessages.map((message, i) => {
                                        const showDate =
                                            i === 0 ||
                                            formatDate(message.timestamp) !==
                                            formatDate(currentRoomMessages[i - 1].timestamp)
                                        return (
                                            <div key={message.id}>
                                                {showDate && (
                                                    <div className="text-center my-3">
                                                        <span className="px-2 py-1 text-xs border rounded">
                                                            {formatDate(message.timestamp)}
                                                        </span>
                                                    </div>
                                                )}
                                                <div
                                                    className={`flex gap-2 ${message.senderId === userId ? "flex-row-reverse" : ""
                                                        }`}
                                                >
                                                    <div className="h-6 w-6 flex items-center justify-center bg-gray-300 rounded-full text-xs font-bold">
                                                        {message.senderName
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </div>
                                                    <div
                                                        className={`max-w-[70%] ${message.senderId === userId ? "text-right" : ""
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs font-medium">
                                                                {message.senderName}
                                                            </span>
                                                            <span
                                                                className={`text-xs px-2 py-0.5 rounded ${getRoleColor(
                                                                    message.senderRole
                                                                )}`}
                                                            >
                                                                {message.senderRole}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {formatTime(message.timestamp)}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={`rounded-lg px-3 py-2 text-sm ${message.senderId === userId
                                                                ? "bg-blue-500 text-white ml-auto"
                                                                : "bg-gray-100 dark:bg-gray-700"
                                                                }`}
                                                        >
                                                            {message.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="border-t p-3 flex items-center gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded">
                                        <File className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded">
                                        <Image className="h-4 w-4" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded">
                                        <Smile className="h-4 w-4" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        className="flex-1 border rounded-lg h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!newMessage.trim()}
                                        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">
                                        Select a chat room to start messaging
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
