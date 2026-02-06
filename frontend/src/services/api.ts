import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email: string, password: string, name: string) =>
    apiClient.post('/auth/register', { email, password, name }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
};

export const projectsAPI = {
  getAll: () => apiClient.get('/projects'),
  getById: (id: string) => apiClient.get(`/projects/${id}`),
  create: (name: string, description: string) =>
    apiClient.post('/projects', { name, description }),
  update: (id: string, name: string, description: string) =>
    apiClient.put(`/projects/${id}`, { name, description }),
  delete: (id: string) => apiClient.delete(`/projects/${id}`),
};

export const assetsAPI = {
  getByProject: (projectId: string) =>
    apiClient.get(`/assets/project/${projectId}`),
  create: (projectId: string, name: string, type: string, description: string) =>
    apiClient.post('/assets', { projectId, name, type, description }),
};
