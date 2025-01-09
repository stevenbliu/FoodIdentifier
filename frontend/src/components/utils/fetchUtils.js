// src/utils/fetchUtils.js

export const fetchWithHeaders = async (url, options) => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
    console.log('fetchWithHeaders Token:', token);
    const headers = {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 63940,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const mergedOptions = { ...options, headers: { ...headers, ...options?.headers } };
  
    try {
      console.log('Fetching data from:', url, 'with options:', mergedOptions);
      const response = await fetch(url, mergedOptions);
      
      if (response.status === 401) {
        // If the token is expired or invalid, attempt to refresh it
        const newToken = await refreshAccessToken(); // Assume you have a function to refresh the token
        if (newToken) {
          headers['Authorization'] = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, { ...mergedOptions, headers });
          return await retryResponse.json();
        }
      }

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

// src/utils/fetchUtils.js

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the refresh token from localStorage

  if (!refreshToken) {
    throw new Error('No refresh token found.');
  }

  try {
    const accessToken = localStorage.getItem('access_token');
    // Send a request to the backend API to refresh the token
    const response = await fetch(`${process.env.REACT_APP_NGROK_PUBLIC_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ refresh: refreshToken }), // Send the refresh token to the backend
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token refresh error:', errorData);

      throw new Error(errorData.error || 'Failed to refresh token.');
    }

    // Parse the response and store the new access token (and refresh token if provided)
    const data = await response.json();
    const { access, refresh } = data;

    // Store the new tokens in localStorage
    localStorage.setItem('access_token', access);
    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
    }

    // Return the new access token
    return access;

  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

  