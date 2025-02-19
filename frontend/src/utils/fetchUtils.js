import { refreshAccessToken, isTokenExpired } from './tokenUtils';

// const BACKEND_URL = process.env.REACT_APP_NGROK_PUBLIC_URL || 'http://localhost:8000/api/';
const BACKEND_URL = 'http://localhost:8000/api/';

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
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    // Let the browser set Content-Type for FormData
    delete headers['Content-Type'];
  }

  if (process.env.DEVELOPER_ENV === '1') {
    headers['ngrok-skip-browser-warning'] = 63940;
  }

  if (requiresAuth) {
    let token = localStorage.getItem('access_token');
    let refresh_token = localStorage.getItem('refresh_token');

    if (!token || isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
        console.log('Refreshed token');
      } catch (error) {
        console.error('Failed to refresh token:', error);
        throw new Error(`Unauthorized. Please log in again. ${error}`);
      }
    }

    headers.Authorization = `Bearer ${token}`;
  }

  try {

    console.log('body:', options.body)
    const response = await fetch(url, { ...options, headers });
    console.log("fetch Utils response:", response);
    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("fetch Utils Response Failed:", `HTTP Response: ${response.status} - ${errorDetails}`);
      throw new Error(`HTTP Response: ${response.status} - ${errorDetails}`);
    }

    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    console.log("fetch Utils response data:", data);
    return data;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
