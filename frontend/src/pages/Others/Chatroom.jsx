import { useState, useEffect, useRef } from "react"
import {
  MessageSquare,
  Send,
  Users,
  Search,
  Filter,
  Phone,
  Video,
  MoreVertical,
  File,
  Image,
  Smile,
} from "lucide-react"

export default function EnhancedChatRoom({ userRole, userName, userId }) {
  const [chatRooms, setChatRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedChatRoom, setSelectedChatRoom] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const messagesEndRef = useRef(null)

  // Mock data
  useEffect(() => {
    const mockChatRooms = [
      {
        id: "1",
        name: "CS 201 - Data Structures",
        description: "Questions and discussions about data structures course",
        type: "academic",
        participants: ["STU001", "STU002", "PROF001"],
        unreadCount: 3,
      },
      {
        id: "2",
        name: "General Announcements",
        description: "School-wide announcements and updates",
        type: "announcement",
        participants: ["STU001", "STU002", "PROF001", "PRIN001"],
        unreadCount: 1,
      },
      {
        id: "3",
        name: "Parent-Teacher Communication",
        description: "Direct communication between parents and teachers",
        type: "general",
        participants: ["PAR001", "PROF001", "PRIN001"],
        unreadCount: 0,
      },
      {
        id: "4",
        name: "Student Support",
        description: "Academic support and counseling",
        type: "support",
        participants: ["STU001", "STU002", "ADM001"],
        unreadCount: 2,
      },
    ]

    const mockMessages = [
      {
        id: "1",
        senderId: "PROF001",
        senderName: "Dr. Robert Smith",
        senderRole: "teacher",
        content:
          "Good morning everyone! Today we’ll be covering binary trees. Please make sure you’ve read chapter 6.",
        timestamp: "2024-08-19T09:00:00Z",
        chatRoomId: "1",
        type: "text",
      },
      {
        id: "2",
        senderId: "STU001",
        senderName: "John Smith",
        senderRole: "student",
        content:
          "Dr. Smith, I have a question about the tree traversal algorithms. Could you explain the difference between pre-order and post-order?",
        timestamp: "2024-08-19T09:15:00Z",
        chatRoomId: "1",
        type: "text",
      },
      {
        id: "3",
        senderId: "PROF001",
        senderName: "Dr. Robert Smith",
        senderRole: "teacher",
        content:
          "Great question, John! Pre-order traversal visits the root first, then left subtree, then right subtree. Post-order does left, right, then root. I’ll demonstrate this in tomorrow’s class.",
        timestamp: "2024-08-19T09:20:00Z",
        chatRoomId: "1",
        type: "text",
      },
      {
        id: "4",
        senderId: "PRIN001",
        senderName: "Dr. Margaret Wilson",
        senderRole: "principal",
        content:
          "Reminder: The annual science fair is scheduled for August 27th. All students and parents are welcome to attend.",
        timestamp: "2024-08-19T08:00:00Z",
        chatRoomId: "2",
        type: "text",
      },
    ]

    setChatRooms(mockChatRooms)
    setMessages(mockMessages)
    if (mockChatRooms.length > 0) setSelectedChatRoom(mockChatRooms[0].id)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedChatRoom])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChatRoom) return
    const msg = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: userName,
      senderRole: userRole,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      chatRoomId: selectedChatRoom,
      type: "text",
    }
    setMessages((prev) => [...prev, msg])
    setNewMessage("")
  }

  const filteredChatRooms = chatRooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === "all" || room.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const currentRoomMessages = messages.filter((m) => m.chatRoomId === selectedChatRoom)
  const currentRoom = chatRooms.find((r) => r.id === selectedChatRoom)

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
      case "administration":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (ts) =>
    new Date(ts).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (ts) => {
    const date = new Date(ts)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return "Today"
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday"
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Communication Hub</h1>
        <p className="text-gray-500">Connect with teachers, students, and parents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Chat Rooms Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search + Filter */}
          <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
            <h2 className="text-sm font-semibold mb-2">Chat Rooms</h2>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                className="w-full pl-10 pr-3 py-1 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="w-full border rounded-lg px-2 py-1 text-sm bg-gray-50 dark:bg-gray-700"
            >
              <option value="all">All</option>
              <option value="academic">Academic</option>
              <option value="general">General</option>
              <option value="announcement">Announcements</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Room List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredChatRooms.map((room) => (
              <div
                key={room.id}
                className={`p-3 cursor-pointer border rounded-lg ${
                  selectedChatRoom === room.id
                    ? "bg-gray-100 dark:bg-gray-700 border-blue-500"
                    : "bg-white dark:bg-gray-800"
                }`}
                onClick={() => setSelectedChatRoom(room.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate">{room.name}</h4>
                  {room.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate mb-2">{room.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                    {room.type}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Users className="h-3 w-3" /> {room.participants.length}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Panel */}
        <div className="lg:col-span-3 flex flex-col border rounded-lg bg-white dark:bg-gray-800">
          {currentRoom ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div>
                  <h2 className="font-semibold">{currentRoom.name}</h2>
                  <p className="text-xs text-gray-500">{currentRoom.description}</p>
                </div>
                <div className="flex gap-2">
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

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentRoomMessages.map((m, idx) => {
                  const showDate =
                    idx === 0 ||
                    formatDate(m.timestamp) !== formatDate(currentRoomMessages[idx - 1].timestamp)
                  return (
                    <div key={m.id}>
                      {showDate && (
                        <div className="text-center text-xs text-gray-500 my-2">
                          {formatDate(m.timestamp)}
                        </div>
                      )}
                      <div
                        className={`flex gap-2 ${
                          m.senderId === userId ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-xs font-bold">
                          {m.senderName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="max-w-[70%]">
                          <div className="flex items-center gap-2 text-xs mb-1">
                            <span className="font-medium">{m.senderName}</span>
                            <span
                              className={`px-2 py-0.5 rounded ${getRoleColor(m.senderRole)}`}
                            >
                              {m.senderRole}
                            </span>
                            <span className="text-gray-400">{formatTime(m.timestamp)}</span>
                          </div>
                          <div
                            className={`px-3 py-2 rounded-lg text-sm ${
                              m.senderId === userId
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            {m.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
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
                  className="flex-1 border rounded-lg px-3 py-1 text-sm"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                <p>Select a chat room to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
          <p className="text-xs text-gray-500">Active Rooms</p>
          <p className="text-lg font-semibold">{chatRooms.length}</p>
        </div>
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
          <p className="text-xs text-gray-500">Unread</p>
          <p className="text-lg font-semibold text-red-600">
            {chatRooms.reduce((sum, r) => sum + r.unreadCount, 0)}
          </p>
        </div>
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
          <p className="text-xs text-gray-500">Today</p>
          <p className="text-lg font-semibold">
            {
              messages.filter(
                (m) => new Date(m.timestamp).toDateString() === new Date().toDateString()
              ).length
            }
          </p>
        </div>
        <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between">
          <p>
            <span className="text-xs text-gray-500">Online</span>
            <br />
            <span className="text-lg font-semibold text-green-600">24</span>
          </p>
          <div className="h-2 w-2 bg-green-500 rounded-full" />
        </div>
      </div>
    </div>
  )
}
