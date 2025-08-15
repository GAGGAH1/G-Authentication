import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Example: login and logout handlers
  const login = (userData) => {
    setUser(userData);
    setError(null);
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading, error, setError, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
