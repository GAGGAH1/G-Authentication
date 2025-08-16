import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userData, setUserData] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default backend URL

  // Example: login and logout handlers
  // const login = (userData) => {
  //   setUser(userData);
  //   setError(null);
  // };

  // const logout = () => {
  //   setUser(null);
  //   setError(null);
  // };
const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    backendUrl
}; 

  return (
    <AppContext.Provider value={{value}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
