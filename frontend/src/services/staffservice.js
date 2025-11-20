import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const staffService = {
  // Fetch staff profile
  getStaffProfile: async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/staff/profile/`, {
        headers: {
          'Authorization': `Token ${token}`,  // or 'Bearer' depending on backend
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
  // Update staff profile
  updateStaffProfile: async (data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/staff/profile/`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
  // Add to staffService.js
getTeachingAnalytics: async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/staff/analytics/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
},

getStudentPerformance: async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/staff/performance/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
}, 
};

export default staffService;