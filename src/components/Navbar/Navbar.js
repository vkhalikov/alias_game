import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { open } from 'redux/action-creators/navigation-fullscreen';
import Logo from '../Logo';
import NavbarLinks from '../NavbarLinks';
import NavigationFullscreen from '../NavigationFullscreen';
import CollapseButton from '../ui/CollapseButton';
import './Navbar.css';


const Navbar = ({ isNavigationFSOpen, openFullscreenNavigation }) => {
  return (
    <nav className="Navbar">
      <Logo />
      <NavbarLinks className="Navbar-links" underline />

      <div className="Navbar-collapse">
        <CollapseButton onClick={openFullscreenNavigation} />
      </div>

      { isNavigationFSOpen && <NavigationFullscreen isOpen={isNavigationFSOpen} />}
    </nav>
  );
};

Navbar.propTypes = {
  isNavigationFSOpen: PropTypes.bool.isRequired,
  openFullscreenNavigation: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navigationFullscreen }) => ({ isNavigationFSOpen: navigationFullscreen.isOpen });

export default connect(mapStateToProps, { openFullscreenNavigation: open })(Navbar);
