import React from 'react';
import Logo from '../Logo';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar teal lighten-2">
      <div className="nav-wrapper container">
        <Logo />
        <ul className="right hide-on-small-and-down">
          <li><a href="sass.html">Okay</a></li>
          <li><a href="badges.html">Here</a></li>
          <li><a href="collapsible.html">We GO</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
