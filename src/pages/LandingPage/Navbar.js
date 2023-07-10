import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Navbar.css';
import logo from './Assets/logo.png';

function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logoNav">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <ul className="navbar-items">
          <li>
            <Link to="/" className="navLink">Home</Link>
          </li>
          <li>
            <a onClick={() => scrollToSection('about')} className="navLink">About Us</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('services')} className="navLink">Services</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('contact')} className="navLink">Contact Us</a>
          </li>
          <li>
            <Link to="/login" className="navButton">Login</Link>
          </li>
          <li>
            <Link to="/register" className="navButton">Sign Up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
