import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // Import user context
import { useNavigate } from 'react-router-dom';

const LOGIN_URL = `${process.env.REACT_APP_NGROK_PUBLIC_URL}/api/login/`;

function Login() {
  const { login } = useUser(); // Access login function from context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);

        // Store user info and tokens
        login(data.user, data.access);  // Pass user data and access token

        // Optionally, store the refresh token if needed
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('access_token', data.access);

        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to login.');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
