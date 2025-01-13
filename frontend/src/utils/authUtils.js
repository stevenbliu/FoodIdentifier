import { fetchAPI} from './fetchUtils';
// This handles the actual registration logic, including network requests and processing the response.

/**
 * Registers a new user with the provided email and password.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The API response containing user data and tokens.
 * @throws {Error} - Throws an error if the API call fails.
 */
export const registerUser = async (email, password) => {
  try {
    const response = await fetchAPI('auth/register/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
        },
    false);

    return response; // Return the response data
  } catch (error) {
    console.error('Error during user registration:', error);
    throw new Error(error.message || 'Unable to register.');
  }
};
