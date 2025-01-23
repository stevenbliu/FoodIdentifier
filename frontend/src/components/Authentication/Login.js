import React, { useState } from 'react';
import { useUser } from '../../context/UserContext'; // Import user context
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/authUtils'; // Import loginUser function
// import './Login.css'; // Import the updated CSS

const Login = () => {
  const { login } = useUser(); // Access login function from context
  const navigate = useNavigate(); // Use navigate from react-router
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for errors

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      console.log('Logging in...');
      // Assuming loginUser returns the user object after a successful login
      const user = await loginUser(email, password, login);

      // If login is successful, call the context's login function
      login(user); // Store user in context

      // After login, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle errors during the login process
      setError(`Failed to login. ${err.message || 'An unexpected error occurred'}`);
    }
  };

  return (
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
      </div>
  );
};

export default Login;
