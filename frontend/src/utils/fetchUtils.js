import { refreshAccessToken, isTokenExpired } from './tokenUtils';


// // // src/utils/fetchUtils.js
const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
const BACKEND_URL = `${REACT_APP_NGROK_PUBLIC_URL}/api/`;

// // export const fetchWithHeaders = async (endpoint, options = {}) => {
// //   const url = `${BACKEND_URL}${endpoint}`;
// //   let token = localStorage.getItem('access_token');

// //   if (isTokenExpired(token)) {
// //     token = await refreshAccessToken();
// //   }

// //   const headers = {
// //     'Content-Type': 'application/json',
// //     'ngrok-skip-browser-warning': 63940,
// //     Authorization: `Bearer ${token}`,
// //     ...(options.headers || {}),
// //   };

// //   const mergedOptions = { ...options, headers };

// //   try {
// //     const response = await fetch(url, mergedOptions);

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! Status: ${response.status}`);
// //     }

// //     return await response.json();
// //   } catch (error) {
// //     console.error('Fetch error:', error);
// //     throw error;
// //   }
// // };


// // export const handleRequest = async (url, method = 'GET', data = null) => {
// //   const options = { 
// //     method, 
// //     headers: { 
// //       'Content-Type': 'application/json', 
// //     },
// //   };

// //   // Only add the body if the method is POST or PUT
// //   if (data && (method === 'POST' || method === 'PUT')) {
// //     options.body = JSON.stringify(data);
// //   }

// //   try {
// //     const response = await fetchWithHeaders(url, options);
// //     return response;
// //   } catch (error) {
// //     console.error(`Error during ${method} request:`, error);
// //   }
// // };

// // // src/utils/fetchUtils.js

// export const refreshAccessToken = async () => {
//   const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the refresh token from localStorage

//   if (!refreshToken) {
//     throw new Error('No refresh token found.');
//   }

//   try {
//     // const accessToken = localStorage.getItem('access_token');
//     // Send a request to the backend API to refresh the token
//     const response = await fetch(`${process.env.REACT_APP_NGROK_PUBLIC_URL}/api/token/refresh/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${accessToken}`
//       },
//       body: JSON.stringify({ refresh: refreshToken }), // Send the refresh token to the backend
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Token refresh error:', errorData);

//       throw new Error(errorData.error || 'Failed to refresh token.');
//     }

//     // Parse the response and store the new access token (and refresh token if provided)
//     const data = await response.json();
//     const { access, refresh } = data;

//     // Store the new tokens in localStorage
//     localStorage.setItem('access_token', access);
//     if (refresh) {
//       localStorage.setItem('refresh_token', refresh);
//     }

//     // Return the new access token
//     return access;

//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//     throw error;
//   }
// };


// // function isTokenExpired(token) {
// //   if (!token) return true;
// //   const payload = JSON.parse(atob(token.split('.')[1]));
// //   return Date.now() >= payload.exp * 1000;
// // }



// const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
// const BACKEND_URL = `${REACT_APP_NGROK_PUBLIC_URL}/api/`;

// export const fetchWithHeaders = async (endpoint, options = {}) => {
//   const url = `${BACKEND_URL}${endpoint}`;
//   let token = localStorage.getItem('access_token');

//   if (isTokenExpired(token)) {
//     try {
//       token = await refreshAccessToken();
//     } catch (error) {
//       console.error('Failed to refresh token:', error);
//       throw new Error('Unauthorized. Please log in again.');
//     }
//   }

//   const headers = {
//     'Content-Type': 'application/json',
//     'ngrok-skip-browser-warning': 63940,
//     Authorization: `Bearer ${token}`,
//     ...options.headers, // Merge custom headers
//   };

//   try {
//     const response = await fetch(url, { ...options, headers });
//     if (!response.ok) {
//       const errorDetails = await response.text();
//       throw new Error(`HTTP error: ${response.status} - ${errorDetails}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// };

// function isTokenExpired(token) {
//   try {
//     if (!token) return true;
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     return Date.now() >= payload.exp * 1000;
//   } catch {
//     return true; // Treat invalid token as expired
//   }
// }


// // import { fetchWithHeaders } from './fetchWithHeaders';

// export const handleRequest = async (endpoint, method = 'GET', data = null) => {
//   const options = {
//     method,
//     ...(data && (method === 'POST' || method === 'PUT') ? { body: JSON.stringify(data) } : {}),
//   };

//   try {
//     return await fetchWithHeaders(endpoint, options);
//   } catch (error) {
//     console.error(`Error during ${method} request to ${endpoint}:`, error);
//     throw error; // Re-throw the error for UI handling
//   }
// };


/**
 * A unified fetch method that handles both authenticated and unauthenticated requests.
 * @param {string} endpoint - API endpoint (relative to the base URL).
 * @param {Object} options - Fetch options (method, headers, body, etc.).
 * @param {boolean} requiresAuth - Whether the request requires authentication.
 * @returns {Promise<Object>} - The API response data.
 * @throws {Error} - Throws if the request fails.
 */
export const fetchAPI = async (endpoint, options = {}, requiresAuth = false) => {
  const url = `${BACKEND_URL}${endpoint}`;
  let headers = {
    'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning': 63940,
    ...options.headers,
  };

  if (process.env.DEVELOPER_ENV === '1') {
    headers['ngrok-skip-browser-warning'] = 63940;
  }
  

  if (requiresAuth) {
    let token = localStorage.getItem('access_token');
    if (isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new Error('Unauthorized. Please log in again.');
      }
    }
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`HTTP error: ${response.status} - ${errorDetails}`);
    }
    return await response.json();

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
