import React from 'react';
import '../App.css';

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>FileDump</h2>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span>Добро пожаловать, {user?.username}</span>
            <button onClick={onLogout} className="logout-btn">
              Выйти
            </button>
          </>
        ) : (
          <span>Файловое хранилище</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;