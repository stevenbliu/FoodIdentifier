import { fetchAPI } from '../utils/fetchUtils'; // Import the fetchAPI function


export async function classifyPhoto(selectedImage) {
    try {
      // Create a new FormData object to send the file
      const formData = new FormData();
      formData.append("photo", selectedImage);  // 'photo' is the key your API expects for the file upload
  
      // Make the API call with fetch
      const response = await fetchAPI("food/predict/", {
        method: "POST",
        body: formData, // Send the FormData containing the image
      }, true); // Assuming 'true' here means the request requires authentication
  
      console.log("Prediction successful:", response);
      return response; // You can process the response as needed (e.g., display the prediction result)
    } catch (error) {
      console.error("Error prediction:", error);
      throw error; // Throw error to be handled by the caller
    }
  }
  