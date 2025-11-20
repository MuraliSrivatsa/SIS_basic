import React, { useState } from 'react';
import TeacherSidebar from './TeacherSideBar1';
import NotificationFilters from './staffcomponents/NotificationFilters';
import NotificationSearch from './staffcomponents/NotificationSearch';
import NotificationList from './staffcomponents/NotificationList';
import CreateAnnouncementModal from './staffcomponents/CreateAnnouncementModal';
import mockNotifications from './staffcomponents/data/mockNotifications';

export default function TeacherNotification() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotifications = mockNotifications.filter((n) => {
    const matchesTab = activeTab === 'all' || (activeTab === 'urgent' && n.priority === 'urgent');
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex">
      <TeacherSidebar />
      <div className="container p-6 bg-gray-50 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notification Center</h1>
            <p className="text-gray-600">Send announcements to students, teachers, and parents</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create Announcement
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <NotificationFilters activeTab={activeTab} onChange={setActiveTab} />
          <NotificationSearch value={searchTerm} onChange={setSearchTerm} />
        </div>

        {/* List */}
        <NotificationList notifications={filteredNotifications} />

        {/* Modal */}
        {isModalOpen && <CreateAnnouncementModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}
