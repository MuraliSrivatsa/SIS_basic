import apiClient from './apiClient';

const studentService = {
  getDashboard: async (studentId = null) => {
    try {
      const url = studentId ? `/students/${studentId}/dashboard/` : '/students/dashboard/';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getPerformanceAnalytics: async (studentId = null) => {
    try {
      const url = studentId ? `/students/${studentId}/performance_analytics/` : '/students/performance_analytics/';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getStudents: async () => {
    try {
      const response = await apiClient.get('/students/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getStudent: async (id) => {
    try {
      const response = await apiClient.get(`/api/students/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getCourses: async () => {
    try {
      const response = await apiClient.get('/courses/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getGrades: async (studentId = null) => {
    try {
      const url = studentId ? `/students/${studentId}/grades/` : '/grades/';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  getAttendance: async (studentId = null) => {
    try {
      const url = studentId ? `/students/${studentId}/attendance/` : '/attendance/';
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  // ✅ FIXED CRUD METHODS
  addStudent: async (studentData) => {
    try {
      const response = await apiClient.post('/students/', studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  updateStudent: async (id, studentData) => {
    try {
      const response = await apiClient.put(`/students/${id}/`, studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },

  deleteStudent: async (id) => {
    try {
      await apiClient.delete(`/students/${id}/`);
      return { success: true };
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
   addStudent: async (studentData) => {
    try {
      const response = await apiClient.post("/students/", studentData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: error.message };
    }
  },
};


export default studentService;
