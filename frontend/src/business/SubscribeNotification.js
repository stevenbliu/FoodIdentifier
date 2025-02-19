import React from 'react';
import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function

// const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `photos`;

// function SubscribeNotifications() {
//   const subscribeToNotifications = async () => {
//     try {
//       // Use fetchAPI to send the GET request
//       const response = await fetchAPI(`${PHOTO_URL}/subscribe/`, {
//         method: 'GET',
//       }, true); // 'true' indicates that authentication is required

//       console.log('Subscription successful:', response);
//       // alert('You have successfully subscribed to notifications!');
//     } catch (error) {
//       console.error('Error subscribing to notifications:', error);
//       // alert('Failed to subscribe. Please try again.');
//     }
//   };

//   return (
//     <button onClick={subscribeToNotifications}>Subscribe to Notifications</button>
//   );
// }

// export default SubscribeNotifications;

export async function subscribeToNotifications() {
  try {
    const response = await fetchAPI("photos/subscribe/", {
      method: "GET",
    }, true);
    console.log("Subscription successful:", response);
  } catch (error) {
    console.error("Error subscribing to notifications:", error);
  }
}