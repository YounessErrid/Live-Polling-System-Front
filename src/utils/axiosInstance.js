import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Define your base API URL here
  // timeout: 10000, // Set a timeout for requests (optional)
  // withCredentials: true, // Include credentials with requests
});

// Add a request interceptor

api.interceptors.request.use((config) => {
  // Add token to headers if it exists in local storage
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
(error) => {
  return Promise.reject(error);
});

export default api;