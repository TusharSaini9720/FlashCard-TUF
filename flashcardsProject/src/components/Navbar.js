// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isOnAdminDashboard = location.pathname === '/add';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Flashcard</h1>
      </div>
      <div className="navbar-right">
        {isOnAdminDashboard ? (
          <Link to="/">Collection</Link>
        ) : (
          <Link to="/add">Add Flashcard</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
