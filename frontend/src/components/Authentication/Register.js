import React, { useState } from 'react';
import { registerUser } from '../../utils/authUtils';

const Register = ({ addMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setError(''); // Clear any previous error messages
      setSuccessMessage(''); // Clear any previous success messages
      setIsLoading(true);

      const response = await registerUser(email, password);
      // Handle the response (e.g., save tokens, redirect user, etc.)
      addMessage('Registration successful!', 'success');
      console.log('Registration successful:', response);

    } catch (error) {
      let errorMessage = 'An error occurred during registration. Please try again.';

      if (error.message.includes('User already exists')) {
        errorMessage = 'The email address is already in use. Please try another one.';
      } else if (error.message.includes('Invalid email format')) {
        errorMessage = 'The email address you entered is invalid. Please check it.';
      } else if (error.message.includes('Password too short')) {
        errorMessage = 'Your password is too short. Please choose a longer one.';
      }
      addMessage(`${errorMessage}`, 'error');
      console.error('Registration error:', error);

    } finally {
      setIsLoading(false);
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
    </div>
  );
};

export default Register;
