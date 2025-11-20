import { useState, useEffect, useRef } from "react"
import { MessageSquare, Send, Users, Search, Filter, Phone, Video, MoreVertical, File, Image, Smile } from "lucide-react"
import { toast } from "sonner";
import Sidebar from "../../components/sidebars/Sidebar";

export default function ChatRoom({ userRole, userName, userId }) {
  const [chatRooms, setChatRooms] = useState([])
  const [messages, setMessages] = useState([])
  const [selectedChatRoom, setSelectedChatRoom] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const messagesEndRef = useRef(null)

  // Mock data
  useEffect(() => {
    const mockChatRooms = [
      { id: '1', name: 'CS 201 - Data Structures', description: 'Questions and discussions about data structures course', type: 'academic', participants: ['STU001', 'STU002', 'PROF001'], unreadCount: 3 },
      { id: '2', name: 'General Announcements', description: 'School-wide announcements and updates', type: 'announcement', participants: ['STU001', 'STU002', 'PROF001', 'PRIN001'], unreadCount: 1 },
      { id: '3', name: 'Parent-Teacher Communication', description: 'Direct communication between parents and teachers', type: 'general', participants: ['PAR001', 'PROF001', 'PRIN001'], unreadCount: 0 },
      { id: '4', name: 'Student Support', description: 'Academic support and counseling', type: 'support', participants: ['STU001', 'STU002', 'ADM001'], unreadCount: 2 },
      { id: '5', name: 'Mathematics Help', description: 'Math tutoring and problem solving', type: 'academic', participants: ['STU001', 'STU003', 'PROF002'], unreadCount: 0 }
    ]

    const mockMessages = [
      { id: '1', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: 'Good morning everyone! Today we\'ll be covering binary trees. Please make sure you\'ve read chapter 6.', timestamp: '2024-08-19T09:00:00Z', chatRoomId: '1', type: 'text' },
      { id: '2', senderId: 'STU001', senderName: 'John Smith', senderRole: 'student', content: 'Dr. Smith, I have a question about the tree traversal algorithms. Could you explain the difference between pre-order and post-order?', timestamp: '2024-08-19T09:15:00Z', chatRoomId: '1', type: 'text' },
      { id: '3', senderId: 'PROF001', senderName: 'Dr. Robert Smith', senderRole: 'teacher', content: 'Great question, John! Pre-order traversal visits the root first, then left subtree, then right subtree. Post-order does left, right, then root. I\'ll demonstrate this in tomorrow\'s class.', timestamp: '2024-08-19T09:20:00Z', chatRoomId: '1', type: 'text' },
      { id: '4', senderId: 'STU002', senderName: 'Sarah Johnson', senderRole: 'student', content: 'Thank you for the explanation! I found this helpful diagram online. Should I share it with the class?', timestamp: '2024-08-19T09:25:00Z', chatRoomId: '1', type: 'text' },
      { id: '5', senderId: 'PRIN001', senderName: 'Dr. Margaret Wilson', senderRole: 'principal', content: 'Reminder: The annual science fair is scheduled for August 27th. All students and parents are welcome to attend.', timestamp: '2024-08-19T08:00:00Z', chatRoomId: '2', type: 'text' },
      { id: '6', senderId: 'PAR001', senderName: 'Robert Smith Sr.', senderRole: 'parent', content: 'Dr. Smith, I wanted to discuss John\'s progress in your class. When would be a good time to schedule a meeting?', timestamp: '2024-08-19T14:30:00Z', chatRoomId: '3', type: 'text' }
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
    setNewMessage('')
    toast.success('Message sent!')
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
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <Sidebar role={"student"}/>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold">Communication Hub</h1>
          <p className="text-gray-500">Connect with teachers, students, and parents</p>
        </div><div className="grid gap-4 md:grid-cols-4 items-stretch mt-6">
          {[
            { title: "Active Rooms", value: chatRooms.length, desc: "Available" },
            { title: "Unread Messages", value: chatRooms.reduce((sum, room) => sum + room.unreadCount, 0), desc: "Total" },
            { title: "Messages Today", value: messages.filter(msg => new Date(msg.timestamp).toDateString() === new Date().toDateString()).length, desc: "Sent" },
            { title: "Online Users", value: 24, desc: "Active now" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-white shadow-sm h-full flex flex-col justify-between"
            >
              <h3 className="text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">

          {/* Chat Rooms */}
          <div className="border rounded-lg p-4 bg-white shadow-sm lg:col-span-1">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <MessageSquare className="h-5 w-5" /> Chat Rooms
            </div>
            <div className="space-y-2 mb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input type="text" placeholder="Search rooms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring" />
              </div>
              <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full border rounded-md p-2 text-sm">
                <option value="all">All Rooms</option>
                <option value="academic">Academic</option>
                <option value="general">General</option>
                <option value="announcement">Announcements</option>
                <option value="support">Support</option>
              </select>
            </div>

            <div className="space-y-1 max-h-[500px] overflow-y-auto">
              {filteredChatRooms.map(room => (
                <div key={room.id} className={`p-3 cursor-pointer border-l-4 hover:bg-gray-100 transition-colors ${selectedChatRoom === room.id ? 'bg-gray-100 border-l-blue-500' : 'border-l-transparent'}`} onClick={() => setSelectedChatRoom(room.id)}>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm truncate">{room.name}</h4>
                    {room.unreadCount > 0 && <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{room.unreadCount}</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{room.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs border rounded px-2 py-0.5">{room.type}</span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Users className="h-3 w-3" /> {room.participants.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="border rounded-lg bg-white shadow-sm flex flex-col lg:col-span-2">
            {currentRoom ? (
              <>
                <div className="border-b p-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">{currentRoom.name}</h2>
                    <p className="text-sm text-gray-500">{currentRoom.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="border rounded p-2"><Phone className="h-4 w-4" /></button>
                    <button className="border rounded p-2"><Video className="h-4 w-4" /></button>
                    <button className="border rounded p-2"><MoreVertical className="h-4 w-4" /></button>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto space-y-4 h-[400px]">
                  {currentRoomMessages.map((message, index) => {
                    const showDate = index === 0 || formatDate(message.timestamp) !== formatDate(currentRoomMessages[index - 1].timestamp)
                    return (
                      <div key={message.id}>
                        {showDate && <div className="text-center my-4"><span className="border px-2 py-1 rounded text-xs text-gray-600">{formatDate(message.timestamp)}</span></div>}
                        <div className={`flex gap-3 ${message.senderId === userId ? 'flex-row-reverse' : ''}`}>
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-300 text-xs font-bold">
                            {message.senderName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`flex-1 max-w-[70%] ${message.senderId === userId ? 'text-right' : ''}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{message.senderName}</span>
                              <span className={`text-xs px-2 py-0.5 rounded ${getRoleColor(message.senderRole)}`}>{message.senderRole}</span>
                              <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                            </div>
                            <div className={`rounded-lg px-3 py-2 ${message.senderId === userId ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-gray-800'}`}>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t p-4 flex items-center gap-2">
                  <button className="border rounded p-2"><File className="h-4 w-4" /></button>
                  <button className="border rounded p-2"><Image className="h-4 w-4" /></button>
                  <button className="border rounded p-2"><Smile className="h-4 w-4" /></button>
                  <input type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} className="flex-1 border rounded-md px-3 py-2 text-sm" />
                  <button onClick={sendMessage} disabled={!newMessage.trim()} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"><Send className="h-4 w-4" /></button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Select a chat room to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Quick Stats */}
        {/* Quick Stats */}


      </div>
    </div>
  )
}
