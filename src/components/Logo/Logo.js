import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="Logo">
      Alias Game
    </Link>
  );
};

export default Logo;
