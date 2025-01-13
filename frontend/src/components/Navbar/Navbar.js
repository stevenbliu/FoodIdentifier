import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for client-side routing
import './Navbar.css'; // Import external CSS for styles

import { useUser } from '../../context/UserContext'; // For logout

function Navbar() {
  const { user, logout } = useUser(); // Access user and logout function

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" className="logo-link">Food Identifier</Link>
        </div>

        {/* Menu Section */}
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/upload" className="navbar-link">Upload</Link>
          </li>
          {/* Add more items here */}
          <li className="navbar-item dropdown">
            <span className="navbar-link">Profile</span>
            <ul className="dropdown-menu">
              <li><Link to="/profile" className="dropdown-link">My Profile</Link></li>
              <li><Link to="/settings" className="dropdown-link">Settings</Link></li>
              <li><Link onclick={logout} className="dropdown-link">Logout </Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
