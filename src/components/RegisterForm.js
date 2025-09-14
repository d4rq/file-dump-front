import React, { useState } from 'react';
import '../App.css';

const RegisterForm = ({ onRegister, switchToLogin }) => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(userData);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p>
        Уже есть аккаунт?{' '}
        <span className="switch-link" onClick={switchToLogin}>
          Войти
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;