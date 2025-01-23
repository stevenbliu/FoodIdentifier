// Dashboard Component: components/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css'; // Add custom styling for Dashboard
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user.username}</h2>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      <div className="dashboard-body">
        <UploadImage setImageUrl={setImageUrl} setFoodInfo={setFoodInfo} />
        <SubscribeNotifications />
        <TestButtons />
        <FetchPhoto setFoodInfo={setFoodInfo} />

        {imageUrl && <img src={imageUrl} alt="Uploaded preview" className="uploaded-image" />}
        
        {foodInfo && (
          <div className="food-info">
            <h3>Food Information</h3>
            <p><strong>Name:</strong> {foodInfo.name}</p>
            <p><strong>Description:</strong> {foodInfo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
