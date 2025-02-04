import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    dateOfBirth: '1990-05-15',
  });

  const handleEdit = () => {
    // Example: Open an editable form or modal to update profile info
    alert('Editing Profile...');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-4">
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </div>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
