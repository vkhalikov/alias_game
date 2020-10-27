import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { open } from 'redux/action-creators/navigation-fullscreen';
import Logo from '../Logo';
import NavbarLinks from '../NavbarLinks';
import NavigationFullscreen from '../NavigationFullscreen';
import CollapseButton from '../ui/CollapseButton';
import './Navbar.css';


const Navbar = ({ openFullscreenNavigation }) => {
  return (
    <nav className="Navbar">
      <Logo />
      <NavbarLinks className="Navbar-links" underline />

      <div className="Navbar-collapse">
        <CollapseButton onClick={openFullscreenNavigation} />
      </div>

      <NavigationFullscreen />
    </nav>
  );
};

Navbar.propTypes = {
  openFullscreenNavigation: PropTypes.func.isRequired,
};


export default connect(null, { openFullscreenNavigation: open })(Navbar);
