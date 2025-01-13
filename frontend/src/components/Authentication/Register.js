import React, { useState } from 'react';
import { registerUser } from './utils/authUtils'; // Make sure to import the method

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await registerUser(email, password);
      // Handle the response (e.g., save tokens, redirect user, etc.)
      alert('Registration successful!');
    } catch (error) {
      setError('Failed to register');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register; // Ensure the Register component is exported
