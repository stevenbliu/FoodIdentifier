import React, { useState } from "react";
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Image,
    Container,
    Grid,
  } from "@chakra-ui/react";
  
const FileInput = ({ onFileChange, label = "Upload Photo", predictionMessage }) => {
    const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview the image before upload
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Call the parent component's onFileChange function
      onFileChange(file);
    }
  };

  return (
    <div className="file-input-container">
      <label htmlFor="file-upload" className="file-upload-label">
        {label}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-upload-input"
      />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" className="preview-image" />
        </div>
      )}

      {predictionMessage && (
        <Text mt={4} color="teal.500" fontWeight="bold">
          Prediction: {predictionMessage}
        </Text>
      )}
    </div>
  );
};

export default FileInput;
