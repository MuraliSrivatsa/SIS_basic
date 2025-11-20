import React from 'react';
import ProfileCard from './ProfileCard';
import InfoSection from './InfoSection';

const PersonalInfo = ({ profileData, isEditing, onChange, onPhotoChange }) => {
  const personalFields = [
    { label: 'First Name', name: 'firstName' },
    { label: 'Last Name', name: 'lastName' },
    { label: 'Email', name: 'email' },
    { label: 'Phone', name: 'phone' },
    { label: 'Address', name: 'address', colSpan: true },
  ];

  const professionalFields = [
    { label: 'Department', name: 'department' },
    { label: 'Position', name: 'position' },
    { label: 'Experience', name: 'experience' },
    { label: 'Education', name: 'education' },
    { label: 'Specialization', name: 'specialization', colSpan: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded shadow">
        <ProfileCard
          profileData={profileData}
          isEditing={isEditing}
          onPhotoChange={onPhotoChange}
        />
        <div className="md:col-span-2">
          <InfoSection
            title="Personal Information"
            fields={personalFields}
            data={profileData}
            isEditing={isEditing}
            onChange={onChange}
          />
        </div>
      </div>

      <InfoSection
        title="Professional Information"
        fields={professionalFields}
        data={profileData}
        isEditing={isEditing}
        onChange={onChange}
      />

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-lg text-gray-700 mb-2">Biography</h2>
        {isEditing ? (
          <textarea
            name="biography"
            rows="4"
            value={profileData.biography}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        ) : (
          <p className="text-gray-600 text-sm">{profileData.biography}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
