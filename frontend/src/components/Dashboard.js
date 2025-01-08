// components/Dashboard.js
import React, { useState } from 'react';
import UploadImage from './FileUpload';
import TestButtons from './TestButtons';
import FetchPhoto from './FetchPhoto';
import { useUser } from '../context/UserContext'; // For logout
import './Dashboard.css';  // Optionally, you can style the dashboard
import SubscribeNotifications from './SubscribeNotification';

function Dashboard() {
  const { user, logout } = useUser(); // Access user and logout function
  const [imageUrl, setImageUrl] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard, {user.username}</h2>
      
      {/* Image upload and food info display */}
      <UploadImage setImageUrl={setImageUrl} setFoodInfo={setFoodInfo} />
      <SubscribeNotifications/>
      <TestButtons />
      <FetchPhoto setFoodInfo={setFoodInfo} />
      
      {/* Display uploaded image */}
      {imageUrl && <img src={imageUrl} alt="Uploaded preview" className="uploaded-image" />}
      
      {/* Display food info if available */}
      {foodInfo && (
        <div className="food-info">
          <h2>Food Info:</h2>
          <p><strong>Name:</strong> {foodInfo.name}</p>
          <p><strong>Description:</strong> {foodInfo.description}</p>
        </div>
      )}
      
      {/* Logout button */}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
