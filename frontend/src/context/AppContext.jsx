import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default backend URL


   const getUserInfo = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/data`);
      if (response.data.success) {
        setUser(response.data.user);
      } else {
        setError(response.data.message || 'Failed to fetch user info');
      } 
    } catch (error) {
      toast.error('Error fetching user info');
      setError(error.message || 'An error occurred');
    }
  }
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
    <AppContext.Provider value={{login, logout, user, setUser, loading, setLoading, error, setError, backendUrl, getUserInfo}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
