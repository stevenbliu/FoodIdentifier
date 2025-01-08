// src/utils/fetchUtils.js

export const fetchWithHeaders = async (url, options) => {
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 63940,
    };
  
    const mergedOptions = { ...options, headers: { ...headers, ...options?.headers } };
  
    try {
      const response = await fetch(url, mergedOptions);
  
      if (!response.ok) {
        const responseText = await response.text();
        console.error('Response body:', responseText);
        throw new Error(`HTTP error! Status: ${response.status} - ${responseText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


export const handleRequest = async (url, method = 'GET', data = null) => {
  const options = { 
    method, 
    headers: { 
      'Content-Type': 'application/json', 
    },
  };

  // Only add the body if the method is POST or PUT
  if (data && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetchWithHeaders(url, options);
    return response;
  } catch (error) {
    console.error(`Error during ${method} request:`, error);
  }
};
  