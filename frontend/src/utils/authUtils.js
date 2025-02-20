import { fetchAPI} from './fetchUtils';
// import { useUser } from '../../context/UserContext'; // Import user context

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
    console.error('Error during user registration12:', error);

    console.error(error)
    console.error(error.message)
    console.error(error.error)
    console.error(error.data)  

    // const errorData = await JSON.parse(error);  // Parse the error message as JSON if it’s not already
    // console.error(errorData)
    // console.error(errorData.error)
    console.log('123231')
    throw new Error(error.message || 'Unable to register.');
  }
};


export const loginUser  = async (email, password, login) => {
  // API-Logic
  // Response Logic
  // const { login } = useUser(); // Access login function from context

  console.log('Logging in user:', email, password);
  try {
    const data = await fetchAPI('auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username: email, password }),
        },
    false);

    // Store user info and tokens
    login(data.user, data.access);  // Pass user data and access token
    console.log('User logged in successfully:', data.refresh, data.access);

    // Optionally, store the refresh token if needed
    // localStorage.setItem('refresh_token', data.refresh);
    // localStorage.setItem('access_token', data.access);
    localStorage.clear();

    return data.user; // Return useful data
  } catch (error) {
    console.error('Error during user login:', error);
    throw new Error(error.message || 'Unable to login.');
  }
};
