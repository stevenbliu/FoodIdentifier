import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const skipLogin = process.env.REACT_APP_SKIP_LOGIN === 'true';

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  };

  useEffect(() => {
    if (skipLogin) {
      const fakeUser = { username: 'fakeUser', email: 'fake@user.com', id: 1 };
      const fakeToken = 'fake-token-1234';
      setUser(fakeUser);
      setToken(fakeToken);
      console.log('Development mode: Skipping login with fake user');
    } else {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        if (isTokenExpired(storedToken)) {
          console.log('Token expired, logging out');
          logout();
        } else {
          setUser(JSON.parse(storedUser));
          setToken(JSON.parse(storedToken));
        }
      }
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(authToken));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = { user, token, setUser, setToken, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
