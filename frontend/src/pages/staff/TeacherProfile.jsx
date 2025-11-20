import React, { useState, useEffect } from 'react';
import { User, BarChart2, FileText, BookOpen } from 'lucide-react';
import PersonalInfo from './staffcomponents/PersonalInfo';
import TeachingAnalytics from './staffcomponents/TeachingAnalytics';
import StudentPerformance from './staffcomponents/StudentPerformance';
import TeacherSidebar from './TeacherSideBar1';
import staffService from '../../services/staffservice';
import { analyticsData, examData, monthlyData } from './staffcomponents/data/teacherData';
import Tabs from './staffcomponents/Tabs'; // Make sure this path is correct

const TeacherProfile = () => {
  const tabs = [
    { name: 'Personal Info', icon: User },
    { name: 'Teaching Analytics', icon: BarChart2 },
    { name: 'Student Performance', icon: FileText },
    { name: 'Course Materials', icon: BookOpen },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await staffService.getStaffProfile();
        setProfileData({
          photo: data.user.profile_picture || '',
          firstName: data.user.first_name || '',
          lastName: data.user.last_name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: data.address || '',
          department: data.department || '',
          position: data.position || '',
          experience: data.experience || '',
          education: data.education || '',
          specialization: data.specialization || '',
          biography: data.biography || '',
        });
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData((prev) => ({ ...prev, photo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        user: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          email: profileData.email,
          phone: profileData.phone,
          profile_picture: profileData.photo,
        },
        address: profileData.address,
        department: profileData.department,
        position: profileData.position,
        experience: profileData.experience,
        education: profileData.education,
        specialization: profileData.specialization,
        biography: profileData.biography,
      };
      await staffService.updateStaffProfile(payload);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <TeacherSidebar />
      <main className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Profile</h1>
          <button
            onClick={toggleEdit}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-8">
          {activeTab === 'Personal Info' && (
            <PersonalInfo
              profileData={profileData}
              isEditing={isEditing}
              onChange={handleChange}
              onPhotoChange={handlePhotoChange}
            />
          )}
          {activeTab === 'Teaching Analytics' && (
            <TeachingAnalytics analytics={analyticsData} />
          )}
          {activeTab === 'Student Performance' && (
            <StudentPerformance examData={examData} monthlyData={monthlyData} />
          )}
          {activeTab === 'Course Materials' && (
            <div className="bg-white p-6 rounded shadow text-center text-gray-500">
              Course Materials content will go here.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherProfile;
