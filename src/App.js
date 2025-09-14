import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import { fileAPI, userAPI } from './services/api';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем наличие токена при загрузке
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      loadFiles();
    }
  }, []);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fileAPI.getFiles();
      setFiles(response.data);
    } catch (error) {
      console.error('Ошибка загрузки файлов:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await userAPI.login(credentials);
      const token = response.data;
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setUser({ username: credentials.username });
      loadFiles();
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка входа. Проверьте данные.');
    }
  };

  const handleRegister = async (userData) => {
    try {
      await userAPI.register(userData);
      alert('Регистрация успешна! Теперь войдите.');
      setShowRegister(false);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка регистрации.');
    }
  };

  const handleLogout = async () => {
    try {
      await userAPI.logout();
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      setFiles([]);
    }
  };

  const handleFileUpload = async (file) => {
    try {
      await fileAPI.uploadFile(file);
      alert('Файл успешно загружен!');
      loadFiles(); // Обновляем список файлов
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      alert('Ошибка загрузки файла.');
    }
  };

  const handleFileDownload = async (id, filename) => {
    try {
      const response = await fileAPI.downloadFile(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Ошибка скачивания файла:', error);
      alert('Ошибка скачивания файла.');
    }
  };

  const handleFileDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот файл?')) {
      try {
        await fileAPI.deleteFile(id);
        alert('Файл удален!');
        loadFiles(); // Обновляем список файлов
      } catch (error) {
        console.error('Ошибка удаления файла:', error);
        alert('Ошибка удаления файла.');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="auth-container">
          {showRegister ? (
            <RegisterForm
              onRegister={handleRegister}
              switchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              switchToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        user={user}
      />
      <div className="main-content">
        <FileUpload onUpload={handleFileUpload} />
        <FileList
          files={files}
          onDownload={handleFileDownload}
          onDelete={handleFileDelete}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;