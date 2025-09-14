import React, { useState } from 'react';
import '../App.css';

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта?{' '}
        <span className="switch-link" onClick={switchToRegister}>
          Зарегистрироваться
        </span>
      </p>
    </div>
  );
};

export default LoginForm;