import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'; // Default backend URL


  const getAuthState = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/auth/is-auth`);
            if (response.data.success) {
              setUser(response.data.data);
              getUserInfo();
            } else {
              setUser(null);
              toast.error(response.data.message || 'Authentication failed');
            }

        } catch (error) {
          toast.error(error.message || 'An error occurred while checking authentication');
        }
  }

   const getUserInfo = async () => {
    try {
            const response = await axios.get(`${backendUrl}/api/user/data`);
            if (response.data.success) {
              setUser(response.data.data);
            } else {
              setError(response.data.message || 'Failed to fetch user info');
            } 
    } catch (error) {
      toast.error('Error fetching user info');
      setError(error.message || 'An error occurred');
    }
  }

  // Use useEffect hook
  useEffect(() => {
    getAuthState();
  },[]);

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    setError(null);
  };

  // Function to handle user logout
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
