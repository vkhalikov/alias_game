import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavbarLink from '../NavbarLink';

import './NavbarLinks.css';

const NavbarLinks = ({ className, underline, closeFullscreenNavigation }) => {
  const finalClassName = classNames('NavbarLinks', { [className]: className });

  return (
    <div className={finalClassName}>
      <NavbarLink href="/" exact underline={underline}>
        <span onClick={closeFullscreenNavigation}>Домой</span>
      </NavbarLink>
      <NavbarLink href="/about" underline={underline}>
        <span onClick={closeFullscreenNavigation}>Об игре</span>
      </NavbarLink>
      <NavbarLink href="/rules" underline={underline}>
        <span onClick={closeFullscreenNavigation}>Правила</span>
      </NavbarLink>
    </div>
  );
};

NavbarLinks.propTypes = {
  className: PropTypes.string,
  underline: PropTypes.bool,
};

export default NavbarLinks;
