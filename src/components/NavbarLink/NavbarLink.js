import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { useHistory } from 'react-router-dom';
import './NavbarLink.css';

const NavbarLink = ({ href, children, underline }) => {
  const history = useHistory();
  const followLink = () => {
    history.push(href);
  };

  return (
    <Button
      kind="nostyle"
      className="NavbarLink"
      onClick={followLink}
    >
      { children }
      { underline && <span className="NavbarLink-border"></span>}
    </Button>
  );
};

NavbarLink.propTypes = {
  href: PropTypes.string.isRequired,
  underline: PropTypes.bool,
};

export default NavbarLink;
