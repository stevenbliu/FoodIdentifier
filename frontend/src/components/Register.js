import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // Import user context
// import {Login} from './Login.js';

// Use the environment variable to dynamically set the backend URL
const REGISTER_URL = `${process.env.REACT_APP_NGROK_PUBLIC_URL}/api/register/`;

function Register() {
  const { login } = useUser(); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleRegister = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (!email.includes('@')) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsLoading(true); // Start loading state
      console.log('NGROK URL:', process.env.REACT_APP_NGROK_PUBLIC_URL);

      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }), // Send request body
      });

      const data = await response.json();
      if (response.ok) {
        setError(''); // Clear any previous errors
        alert('Registration successful! Please log in.'); // Success message
        login(data.user, data.token); // Update context with user data
      } else {
        console.error('Backend response:', data); // Log backend response
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Registration error:', err); // Log fetch error
      setError('Failed to register.');
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;
