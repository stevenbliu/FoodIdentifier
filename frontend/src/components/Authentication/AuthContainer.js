import React, { useState } from 'react';
import Register from './Register';  // Import Register component
import Login from './Login';        // Import Login component
import './AuthContainer.css';      // Make sure to import the CSS file for styles

const AuthContainer = () => {
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

  return (
    <div>
      <h2>Authentication</h2>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.type}`}  // Dynamically assign class based on message type
        >
          {msg.message}
        </div>
      ))}
      <Register addMessage={addMessage} />  {/* Pass addMessage to Register */}
      <Login addMessage={addMessage} />     {/* Pass addMessage to Login */}
    </div>
  );
};

export default AuthContainer;
