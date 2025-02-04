import { refreshAccessToken, isTokenExpired } from './tokenUtils';


// // // src/utils/fetchUtils.js
const REACT_APP_NGROK_PUBLIC_URL = process.env.REACT_APP_NGROK_PUBLIC_URL;
var BACKEND_URL = `${REACT_APP_NGROK_PUBLIC_URL}/api/`;
BACKEND_URL = 'http://localhost:8000/api/';

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
  console.log("fetchingAPI url:", url);
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
    let refresh_token = localStorage.getItem('refresh_token');
    console.log("auth access_token:", token);
    console.log("auth refresh_token:", refresh_token);

    if (isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
        console.log('refreshed token')
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new Error(`Unauthorized. Please log in again. ${error}`);
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
    console.log("fetch utils response:", response.json());
    return response;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
