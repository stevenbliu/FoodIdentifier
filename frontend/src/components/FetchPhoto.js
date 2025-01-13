import React, { useState } from 'react';
import { handleRequest } from '../utils/fetchUtils'; // Import the fetch function

const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `${REACT_APP_NGROK_PUBLIC_URL}/photos`;

function FetchPhotoDetails() {
  const [photoId, setPhotoId] = useState('');

  const handlePhotoIdChange = (event) => setPhotoId(event.target.value);

  const fetchPhotoDetails = () => {
    if (!photoId) {
      alert('Please enter a photo ID.');
      return;
    }
    handleRequest(`${PHOTO_URL}/${photoId}/`, 'GET'); // Use the dynamic photo ID
  };

  return (
    <div>
      <input
        type="text"
        value={photoId}
        onChange={handlePhotoIdChange}
        placeholder="Enter photo ID"
      />
      <button onClick={fetchPhotoDetails}>Fetch Photo Details</button>
    </div>
  );
}

export default FetchPhotoDetails;
