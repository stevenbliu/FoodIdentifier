import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Navbar.css';
import LoginModal from '../Authentication/LoginModal'; // Import the modal component

function Navbar() {
  const { user, logout } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/" className="logo-link">Food Identifier</Link>
        </div>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/upload" className="navbar-link">Upload</Link>
          </li>

          <li className="navbar-item dropdown">
            <span className="navbar-link">Profile</span>
            <ul className="dropdown-menu">
              {user ? (
                <>
                  <li><Link to="/profile" className="dropdown-link">My Profile</Link></li>
                  <li><Link to="/settings" className="dropdown-link">Settings</Link></li>
                  <li><span onClick={logout} className="dropdown-link">Logout</span></li>
                </>
              ) : (
                <li>
                  <span onClick={() => setIsModalOpen(true)} className="dropdown-link">
                    Register/Login
                  </span>
                </li>
              )}
            </ul>
          </li>
        </ul>
      </div>

      {/* Login/Register Modal */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </nav>
  );
}

export default Navbar;
