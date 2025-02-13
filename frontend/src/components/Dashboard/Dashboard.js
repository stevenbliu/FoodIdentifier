import React, { useState } from 'react';
import UploadImage from '../FileUpload';
import TestButtons from '../TestButtons';
import FetchPhoto from '../FetchPhoto';
import { useUser } from '../../context/UserContext';
import SubscribeNotifications from '../SubscribeNotification';

function Dashboard() {
  const { user, logout } = useUser();
  const [imageUrl, setImageUrl] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center text-black mb-12">
          <div>
            <h2 className="text-4xl font-extrabold">Hello, {user.username}</h2>
            <p className="mt-2 text-lg">Welcome to your dashboard</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 text-lg font-semibold bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Image Upload Section */}
          <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-black mb-4">Upload Your Image</h3>
            <UploadImage setImageUrl={setImageUrl} setFoodInfo={setFoodInfo} />
          </div>

          {/* Notifications Subscription Section */}
          <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-black mb-4">Subscribe to Notifications</h3>
            <SubscribeNotifications />
          </div>

          {/* Test Buttons Section */}
          <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-black mb-4">Test Functions</h3>
            <TestButtons />
          </div>

          {/* Fetch Food Info Section */}
          <div className="bg-white bg-opacity-30 p-6 rounded-2xl shadow-lg backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-black mb-4">Fetch Food Info</h3>
            <FetchPhoto setFoodInfo={setFoodInfo} />
          </div>

        </div>

        {/* Display the uploaded image */}
        {imageUrl && (
          <div className="mt-8 bg-white bg-opacity-20 p-8 rounded-xl shadow-lg backdrop-blur-lg">
            <h4 className="text-2xl font-semibold mb-4">Uploaded Image</h4>
            <img src={imageUrl} alt="Uploaded preview" className="max-w-full h-auto rounded-xl shadow-md" />
          </div>
        )}

        {/* Display Food Information */}
        {foodInfo && (
          <div className="mt-8 bg-white bg-opacity-20 p-8 rounded-xl shadow-lg backdrop-blur-lg">
            <h4 className="text-2xl font-semibold mb-4">Food Information</h4>
            <p><strong>Name:</strong> {foodInfo.name}</p>
            <p><strong>Description:</strong> {foodInfo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
