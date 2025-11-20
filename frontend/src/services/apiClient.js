 import axios from 'axios';
 const API_BASE_URL = 'http://192.168.1.27/api';
 const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
 });
 // Request interceptor
 apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
 );
 // Response interceptor
 apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
 );
 export default apiClient;
