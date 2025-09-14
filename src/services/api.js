import axios from 'axios';

const API_BASE_URL = 'http://localhost:5053'; // Замените на ваш URL API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен авторизации к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fileAPI = {
  // Загрузка файла
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/File', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Получение списка файлов
  getFiles: () => api.get('/api/File'),

  // Скачивание файла
  downloadFile: (id) => api.get(`/api/File/${id}`, { responseType: 'blob' }),

  // Удаление файла
  deleteFile: (id) => api.delete(`/api/File/${id}`),
};

export const userAPI = {
  // Регистрация
  register: (userData) => api.post('/api/User/register', userData),

  // Вход
  login: (credentials) => api.post('/api/User/login', credentials),

  // Выход
  logout: () => api.post('/api/User/logout'),
};

export const testAPI = {
  test: () => api.get('/api/Test'),
};

export default api;