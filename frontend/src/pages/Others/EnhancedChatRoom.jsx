import { useState, useEffect, useRef } from "react"
import { MessageSquare, Send, Users, Search, Filter, Phone, Video, MoreVertical, File, Image, Smile } from "lucide-react"
import { toast } from "sonner"

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
      { id: '1', name: 'CS 201 - Data Structures', description: 'Questions and discussions about data structures course', type: 'academic', participants: ['STU001', 'STU002', 'PROF001'], unreadCount: 3 },
      { id: '2', name: 'General Announcements', description: 'School-wide announcements and updates', type: 'announcement', participants: ['STU001', 'STU002', 'PROF001', 'PRIN001'], unreadCount: 1 },
      { id: '3', name: 'Parent-Teacher Communication', description: 'Direct communication between parents and teachers', type: 'general', participants: ['PAR001', 'PROF001', 'PRIN001'], unreadCount: 0 },
      { id: '4', name: 'Student Support', description: 'Academic support and counseling', type: 'support', participants: ['STU001', 'STU002', 'ADM001'], unreadCount: 2 }
    ]

    const mockMessages = [
      { id: '1', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: "Good morning everyone! Today we'll be covering binary trees. Please make sure you've read chapter 6.", timestamp: '2024-08-19T09:00:00Z', chatRoomId: '1', type: 'text' },
      { id: '2', senderId: 'STU001', senderName: 'John Smith', senderRole: 'student', content: "Dr. Smith, I have a question about the tree traversal algorithms. Could you explain the difference between pre-order and post-order?", timestamp: '2024-08-19T09:15:00Z', chatRoomId: '1', type: 'text' },
      { id: '3', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: "Great question, John! Pre-order traversal visits the root first, then left subtree, then right subtree. Post-order does left, right, then root. I'll demonstrate this in tomorrow's class.", timestamp: '2024-08-19T09:20:00Z', chatRoomId: '1', type: 'text' },
      { id: '4', senderId: 'PRIN001', senderName: 'Dr. Margaret Wilson', senderRole: 'principal', content: "Reminder: The annual science fair is scheduled for August 27th. All students and parents are welcome to attend.", timestamp: '2024-08-19T08:00:00Z', chatRoomId: '2', type: 'text' }
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
    const message = { id: Date.now().toString(), senderId: userId, senderName: userName, senderRole: userRole, content: newMessage.trim(), timestamp: new Date().toISOString(), chatRoomId: selectedChatRoom, type: 'text' }
    setMessages(prev => [...prev, message])
    setNewMessage("")
    toast.success("Message sent!")
  }

  const filteredChatRooms = chatRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || room.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const currentRoomMessages = messages.filter(msg => msg.chatRoomId === selectedChatRoom)
  const currentRoom = chatRooms.find(room => room.id === selectedChatRoom)

  const getRoleColor = (role) => {
    switch (role) {
      case 'teacher': return 'bg-blue-100 text-blue-800'
      case 'student': return 'bg-green-100 text-green-800'
      case 'parent': return 'bg-purple-100 text-purple-800'
      case 'principal': return 'bg-red-100 text-red-800'
      case 'admin': return 'bg-orange-100 text-orange-800'
      case 'administration': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Communication Hub</h1>
        <p className="text-gray-500">Connect with teachers, students, and parents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Chat Rooms List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search & Filter */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border space-y-3">
            <h2 className="text-sm font-semibold">Chat Rooms</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full border rounded-lg h-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full border rounded-lg h-8 text-sm px-2">
              <option value="all">All</option>
              <option value="academic">Academic</option>
              <option value="general">General</option>
              <option value="announcement">Announcements</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Room List */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredChatRooms.map(room => (
              <div key={room.id} onClick={() => setSelectedChatRoom(room.id)} className={`p-3 cursor-pointer border rounded-lg transition ${selectedChatRoom === room.id ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white dark:bg-gray-800'}`}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm truncate">{room.name}</h4>
                  {room.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{room.unreadCount}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate mb-2">{room.description}</p>
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

        {/* Chat Messages */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow border flex flex-col">
          {currentRoom ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h2 className="font-semibold text-lg">{currentRoom.name}</h2>
                  <p className="text-sm text-gray-500">{currentRoom.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded"><Phone className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-gray-100 rounded"><Video className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-gray-100 rounded"><MoreVertical className="h-4 w-4" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {currentRoomMessages.map((message, i) => {
                  const showDate = i === 0 || formatDate(message.timestamp) !== formatDate(currentRoomMessages[i - 1].timestamp)
                  return (
                    <div key={message.id}>
                      {showDate && <div className="text-center my-3"><span className="px-2 py-1 text-xs border rounded">{formatDate(message.timestamp)}</span></div>}
                      <div className={`flex gap-2 ${message.senderId === userId ? 'flex-row-reverse' : ''}`}>
                        <div className="h-6 w-6 flex items-center justify-center bg-gray-300 rounded-full text-xs font-bold">
                          {message.senderName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`max-w-[70%] ${message.senderId === userId ? 'text-right' : ''}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium">{message.senderName}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${getRoleColor(message.senderRole)}`}>{message.senderRole}</span>
                            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                          </div>
                          <div className={`rounded-lg px-3 py-2 text-sm ${message.senderId === userId ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 dark:bg-gray-700'}`}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-3 flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded"><File className="h-4 w-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded"><Image className="h-4 w-4" /></button>
                <button className="p-2 hover:bg-gray-100 rounded"><Smile className="h-4 w-4" /></button>
                <input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 border rounded-lg h-9 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button onClick={sendMessage} disabled={!newMessage.trim()} className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"><Send className="h-4 w-4" /></button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a chat room to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
          <p className="text-xs text-gray-500">Active Rooms</p>
          <p className="text-lg font-semibold">{chatRooms.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
          <p className="text-xs text-gray-500">Unread</p>
          <p className="text-lg font-semibold text-red-600">{chatRooms.reduce((s, r) => s + r.unreadCount, 0)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
          <p className="text-xs text-gray-500">Today</p>
          <p className="text-lg font-semibold">{messages.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString()).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border shadow">
          <p className="text-xs text-gray-500">Online</p>
          <p className="text-lg font-semibold text-green-600">24</p>
        </div>
      </div>
    </div>
  )
}
