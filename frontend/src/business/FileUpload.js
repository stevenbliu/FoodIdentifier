import React, { useState } from 'react';
import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function

const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const PHOTO_URL = `photos`;

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
    console.log('Setting isUploading State:', true);
    setIsUploading(true);

    console.info('Uploading image:', file);
    try {
      // Step 1: Create the file and get the upload URL
      console.info('Fetching create URL:', `${PHOTO_URL}/create/`);
      const createResponse = await fetchAPI(`${PHOTO_URL}/create/`, {
        method: 'POST',
        body: JSON.stringify({ filename: file.name, file_size: file.size, file_type: file.type}),
      }, true); // 'true' indicates authentication is required

      console.info('Create Response:', createResponse);
      const { s3_presigned_url } = createResponse;
      if (!s3_presigned_url) throw new Error('Invalid response from server.');
      
      console.info('Upload URL:', s3_presigned_url);
      // Step 2: Upload the file to the obtained URL
      const uploadResponse = await fetch(s3_presigned_url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      console.info('Upload Response:', uploadResponse);
      if (uploadResponse.ok) {
        setImageUrl(s3_presigned_url); // Set the uploaded image URL
      } else {
        const errorBody = await uploadResponse.text(); // Get detailed error message
        console.error('Upload failed:', uploadResponse.status, uploadResponse.statusText, errorBody);
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorBody}`);
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
