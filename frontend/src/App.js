import React, { useEffect } from 'react';
import './App.css';
import './components/Authentication/AuthContainer.css'; // AuthContainer styles
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { useUser } from './context/UserContext'; // Import the useUser hook
import Dashboard from './components/Dashboard/Dashboard';
import AuthContainer from './components/Authentication/AuthContainer'; // Import AuthContainer
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Import layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

const App = () => {
  const { user, login } = useUser(); // Extract user and login from context

  // Skip login in development mode if environment variable is set
  let skipLogin = process.env.REACT_APP_SKIP_LOGIN === 'true';
  // Set skipLogin to true temporarily for development simulation
  skipLogin = true; // Set to false for real authentication flow

  // Simulate a user login in development mode
  useEffect(() => {
    if (skipLogin && !user) {
      const devUser = { username: 'devUser', email: 'dev@user.com', id: 1 };
      const devToken = 'dev-token-1234';
      login(devUser, devToken); // Log in with fake user data
    }
  }, [skipLogin, user, login]); // Only trigger effect if skipLogin is true

  return (
    <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <h1>Food Identifier</h1>

          <Routes>
            {/* Home Route: Redirect to dashboard if logged in */}
            <Route
              path="/"
              element={skipLogin || user ? (
                <Navigate to="/dashboard" /> // Redirect to dashboard if logged in or skipLogin is true
              ) : (
                <AuthContainer /> // Show authentication form if not logged in
              )}
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<AuthLayout><AuthContainer /></AuthLayout>} />

            {/* Main Dashboard Routes */}
            <Route path="/dashboard" element={user ? (
              <DashboardLayout><Dashboard /></DashboardLayout>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )} />
            <Route path="/calendar" element={user ? (
              <DashboardLayout><Calendar /></DashboardLayout>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )} />
            <Route path="/profile" element={user ? (
              <DashboardLayout><Profile /></DashboardLayout>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )} />
            <Route path="/settings" element={user ? (
              <DashboardLayout><Settings /></DashboardLayout>
            ) : (
              <Navigate to="/login" /> // Redirect to login if not logged in
            )} />
          </Routes>
        </header>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
