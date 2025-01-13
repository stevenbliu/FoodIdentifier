import React, { useState } from 'react';
import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function

const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `${REACT_APP_NGROK_PUBLIC_URL}/photos`;

function FileUpload({ setImageUrl }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile || null);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert('Please select an image.');
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Create the file and get the upload URL
      const createResponse = await fetchAPI(`${PHOTO_URL}/create/`, {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, file_size: file.size }),
      }, true); // 'true' indicates authentication is required

      const { url } = createResponse;
      if (!url) throw new Error('Invalid response from server.');

      // Step 2: Upload the file to the obtained URL
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (uploadResponse.ok) {
        setImageUrl(url); // Set the uploaded image URL
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {fileName && <p>Selected file: {fileName}</p>}
      <button onClick={handleImageUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}

export default FileUpload;
