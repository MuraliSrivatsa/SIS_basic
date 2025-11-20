import axios from 'axios';
 const API_BASE_URL = 'http://localhost:8000/api';
 // Set up axios interceptor for token
 axios.interceptors.request.use(
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
 const authService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
        username,
        password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log(response.data.user)
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register/`, userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
  logout: async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout/`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      return JSON.parse(user);
    }
    
    return null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  getProfile: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/profile/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  }
      
 };
export default authService;