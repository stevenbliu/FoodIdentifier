import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import { useUser, UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const { user, login, logout } = useUser(); // Get user state and authentication functions

  // Skip login based on environment variable
  const skipLogin = process.env.REACT_APP_SKIP_LOGIN === 'true'; // Control login skip behavior
  console.log('Skip login:', skipLogin); // Remove in production

  useEffect(() => {
    // Only run this effect once (if skipLogin is true)
    if (skipLogin && !user) {
      console.log('Development mode: Skipping login...');
      const fakeUser = { username: 'devUser', email: 'dev@user.com', id: 1 }; // Fake user data
      const fakeToken = 'dev-token-1234'; // Fake token
      login(fakeUser, fakeToken); // Log in with fake data
    }
  }, [skipLogin, user, login]); // Ensure the effect is only triggered once when skipLogin is true

  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Food Identifier</h1>

          <Routes>
            {/* Home Route */}
            <Route
              path="/"
              element={
                skipLogin || user ? (
                  <Navigate to="/dashboard" /> // Automatically go to dashboard if skipLogin or user exists
                ) : (
                  <>
                    <h2>Please log in or register</h2>
                    <Login />
                    <Register />
                  </>
                )
              }
            />

            {/* Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                skipLogin || user ? (
                  <Dashboard /> // Show Dashboard if logged in or skipLogin is true
                ) : (
                  <Navigate to="/" /> // Redirect to home if not logged in
                )
              }
            />
          </Routes>
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
