import React, { useState } from 'react';
import { registerUser } from '../../utils/authUtils'; // Make sure to import the method
// This handles the UI interactions, like form submission, error handling, and loading states.

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]); // State to hold messages

  // Helper function to add a message
  const addMessage = (message, type) => {
    const newMessage = { id: Date.now(), message, type }; // Unique ID for each message
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Remove the message after 5 seconds
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }, 5000);
  };



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
      // history.pushState('/dashboard');
      // alert('Registration successful!');


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

      {/* Display messages */}
      {messages.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: '10px',
                margin: '5px 0',
                backgroundColor: msg.type === 'success' ? 'green' : 'red',
                color: 'white',
              }}
            >
              {msg.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Register; // Ensure the Register component is exported
