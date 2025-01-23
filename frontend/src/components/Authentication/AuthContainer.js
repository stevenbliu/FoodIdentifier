import React, { useState } from 'react';
import Register from './Register';  // Import Register component
import Login from './Login';        // Import Login component
import './AuthContainer.css';      // Make sure to import the CSS file for styles

const AuthContainer = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // Manage toggle between Login and Register
  const [messages, setMessages] = useState([]);

  // Helper function to add a message
  const addMessage = (message, type) => {
    const newMessage = { id: Date.now(), message, type };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Remove the message after 5 seconds
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== newMessage.id)
      );
    }, 5000);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);  // Toggle between Login and Register
  };

  return (
    <div className="auth-container">
      <h2>Authentication</h2>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.type}`}  // Dynamically assign class based on message type
        >
          {msg.message}
        </div>
      ))}

      {/* Auth form block */}
      <div className="auth-inner">
        {/* Register Block (left side) */}
        {!isSignUp && (
          <div className="auth-block register">
            <Register addMessage={addMessage} />
            <p>
              <span id="sign-in-btn" onClick={toggleForm}>
                Already have an account? Login here.
              </span>
            </p>
          </div>
        )}

        {/* Login Block (right side) */}
        {!isSignUp && (
          <div className="auth-block login">
            <Login addMessage={addMessage} />
            <p>
              <span id="sign-up-btn" onClick={toggleForm}>
                No account? Sign up, click here.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthContainer;
