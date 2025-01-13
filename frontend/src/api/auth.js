import { fetchWithHeaders } from '../utils/fetchUtils';

/**
 * Registers a new user with the provided email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The API response containing user data and tokens.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const registerUser = async (email, password) => {
  try {
    const response = await fetchWithHeaders('auth/register/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
    });

    return response; // Return the response data
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error(error.message || 'Unable to register.');
  }
};

/**
 * Logs in a user with the provided email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The API response containing user data and tokens.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetchWithHeaders('auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
    });

    return response; // Return the response data
  } catch (error) {
    console.error('Error during user login:', error);
    throw new Error(error.message || 'Unable to login.');
  }
};

/**
 * Refreshes the access token using a stored refresh token.
 * @returns {Promise<string>} - The new access token.
 * @throws {Error} - Throws an error if the refresh token is invalid or expired.
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token found.');
  }

  try {
    const response = await fetchWithHeaders('auth/token/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });

    const { access, refresh } = response;

    // Store the new tokens in localStorage
    localStorage.setItem('access_token', access);
    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
    }

    return access; // Return the new access token
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
