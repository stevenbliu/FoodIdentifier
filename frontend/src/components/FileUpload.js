import React, { useState } from 'react';
import { fetchWithHeaders } from './utils/fetchUtils'; // Import the fetch function

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
      const createResponse = await fetchWithHeaders(`${PHOTO_URL}/create/`, {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, file_size: file.size }),
      });

      const { url } = await createResponse;
      if (!url) throw new Error('Invalid response from server.');

      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (uploadResponse.ok) {
        setImageUrl(url);
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
