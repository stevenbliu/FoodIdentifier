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

const FileInput = ({
  onFileChange,
  label = "Upload Photo",
  predictionMessage,
}) => {
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
        <Box
          mt={4}
          p={3}
          bg="teal.100"
          borderRadius="md"
          border="1px solid"
          borderColor="teal.300"
          textAlign="center"
        >
          <Text color="teal.700" fontWeight="bold">
            🔍 Prediction: {predictionMessage}
          </Text>
        </Box>
      )}
    </div>
  );
};

export default FileInput;
