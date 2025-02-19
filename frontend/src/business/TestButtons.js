import React from 'react';
import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function

const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `photos`;

function TestRequest() {
  const sendTestRequest = async () => {
    try {
      const response = await fetchAPI(`${PHOTO_URL}/inject-test-data/`, { method: 'GET' }, true);
      // const data = await response.json();
      console.log('Test request response:', response);
    } catch (error) {
      console.error('Error sending test request:', error);
    }
  };

  return <button onClick={sendTestRequest}>Send Test Request</button>;
}

export default TestRequest;
