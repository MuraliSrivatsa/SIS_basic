import React from 'react';

const ProfileCard = ({ profileData, isEditing, onPhotoChange }) => {
  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img
          src={profileData.photo || 'https://via.placeholder.com/128'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-300"
        />
        {isEditing && (
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onPhotoChange}
            />
            <span className="bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300">
              📷
            </span>
          </label>
        )}
      </div>
      <h2 className="text-xl font-semibold text-gray-800">
        {profileData.firstName} {profileData.lastName}
      </h2>
      <p className="text-gray-500">{profileData.position}</p>
    </div>
  );
};

export default ProfileCard;
