import React, { useEffect } from 'react';
import './App.css';
// import './components/Authentication/AuthContainer.css'; // AuthContainer styles
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

import './index.css'

// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { user, login } = useUser(); // Extract user and login from context

  // Skip login in development mode if environment variable is set
  let skipLogin = process.env.REACT_APP_SKIP_LOGIN === 'true';
  // Simulate login for dev mode
  skipLogin = true; // Set to false for real authentication flow

  // Simulate a user login in development mode
  useEffect(() => {
    if (skipLogin && !user) {
      const devUser = { username: 'devUser', email: 'dev@user.com', id: 1 };
      const devToken = 'dev-token-1234';
      login(devUser, devToken); // Log in with fake user data
    }
  }, [skipLogin, user, login]);

  return ( 
    <Router>
      <div className="App bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
        
        <div className="bg-blue-500 text-black p-4">
          If this text has a blue background, Tailwind is working!
        </div>

        
        {/* Navbar */}
        <Navbar />
        
        <div className="container mx-auto p-8">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white">Food Identifier</h1>
          </header>

          {/* Routing */}
          <Routes>
            {/* Home Route: Redirect to dashboard if logged in */}
            <Route
              path="/"
              element={skipLogin || user ? (
                <Navigate to="/dashboard" />
              ) : (
                <AuthContainer />
              )}
            />

            {/* Authentication Routes */}
            <Route path="/login" element={<AuthLayout><AuthContainer /></AuthLayout>} />

            {/* Main Dashboard Routes */}
            <Route path="/dashboard" element={user ? (
              <DashboardLayout><Dashboard /></DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/calendar" element={user ? (
              <DashboardLayout><Calendar /></DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/profile" element={user ? (
              <DashboardLayout><Profile /></DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )} />
            <Route path="/settings" element={user ? (
              <DashboardLayout><Settings /></DashboardLayout>
            ) : (
              <Navigate to="/login" />
            )} />
          </Routes>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
