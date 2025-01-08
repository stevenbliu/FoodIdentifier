// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new 'react-dom/client'
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext'; // Import UserProvider

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
