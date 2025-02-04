import React, { useState } from 'react';
import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function

const BASE_ENDPOINT = 'photos';

function FetchPhotoDetails() {
  const [photoId, setPhotoId] = useState('');
  const [photoDetails, setPhotoDetails] = useState(null); // State for the photo details
  const [error, setError] = useState(''); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handlePhotoIdChange = (event) => setPhotoId(event.target.value);

  const fetchPhotoDetails = async () => {
    if (!photoId.trim()) {
      setError('Please enter a valid photo ID.');
      return;
    }

    try {
      setIsLoading(true);
      setError(''); // Reset error message
      const endpoint = `${BASE_ENDPOINT}/${photoId}/`; // Dynamic endpoint
      const response = await fetchAPI(endpoint, { method: 'GET' }, true); // Use fetchAPI to get data (auth required)

      if (!response) {
        setError('No photo details found.');
        return;
      }

      setPhotoDetails(response); // Save the response in state
    } catch (err) {
      // Display a user-friendly error message if no specific message is provided
      setError(err.message || 'Failed to fetch photo details. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div>
      <h2>Fetch Photo Details</h2>
      <input
        type="text"
        value={photoId}
        onChange={handlePhotoIdChange}
        placeholder="Enter photo ID"
      />
      <button onClick={fetchPhotoDetails} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch Photo Details'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {photoDetails && (
        <div>
          <h3>Photo Details:</h3>
          <pre>{JSON.stringify(photoDetails, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FetchPhotoDetails;
