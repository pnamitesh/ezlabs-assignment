
import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-v">V</span>
          <span className="logo-text">Films</span>
        </div>
        <nav className="nav-menu">
          <button className="menu-icon">☰</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;