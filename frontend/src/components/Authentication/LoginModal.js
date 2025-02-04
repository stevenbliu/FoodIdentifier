import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>✖</button>

        <h2>{isLogin ? 'Login' : 'Register'}</h2>

        <form>
          {!isLogin && (
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="auth-button">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
