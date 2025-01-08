import React from 'react';
import { handleRequest } from './utils/fetchUtils'; // Import the fetch function



const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `${REACT_APP_NGROK_PUBLIC_URL}/photos`;

function SubscribeNotifications() {
    const subscribeToNotifications = () => handleRequest(`${PHOTO_URL}/subscribe/`, 'GET');


  return <button onClick={subscribeToNotifications}>Subscribe to Notifications</button>;
}

export default SubscribeNotifications;


