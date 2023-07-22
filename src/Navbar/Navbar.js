import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const NavigationBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-text">
          Frontend-Assignment
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
