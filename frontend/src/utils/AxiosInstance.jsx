
import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Change if your backend URL is different
  withCredentials: true, // if you use cookies for auth
});

// Request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default AxiosInstance;

