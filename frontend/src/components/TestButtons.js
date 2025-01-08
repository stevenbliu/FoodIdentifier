import React from 'react';

const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `${REACT_APP_NGROK_PUBLIC_URL}/photos`;

function TestRequest() {
  const sendTestRequest = async () => {
    try {
      const response = await fetch(`${PHOTO_URL}/inject-test-data/`, { method: 'POST' });
      const data = await response.json();
      console.log('Test request response:', data);
    } catch (error) {
      console.error('Error sending test request:', error);
    }
  };

  return <button onClick={sendTestRequest}>Send Test Request</button>;
}

export default TestRequest;
