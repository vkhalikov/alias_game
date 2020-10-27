import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from '../Logo';
import CollapseButton from '../ui/CollapseButton';
import NavbarLinks from '../NavbarLinks';
import { close } from '../../redux/action-creators/navigation-fullscreen';
import {  useDocumentEventListener } from '../../hooks';
import './NavigationFullscreen.css';

const NavigationFullscreen = ({ isOpen, close }) => {
  const closeOnEscape = useCallback(({ key }) => {
    if (key === 'Escape') {
      close();
    }
  }, [close]);


  useDocumentEventListener('keydown', closeOnEscape);

  const finalClassName = classNames('NavigationFullscreen', { 'is-open': isOpen });

  return (
    <nav className={finalClassName}>
      <div className="NavigationFullscreen-topPanel">
        <Logo />
        <CollapseButton isOpen={isOpen} onClick={close} />
      </div>
      <NavbarLinks className="NavigationFullscreen-links" closeFullscreenNavigation={close} />
    </nav>
  );
};

NavigationFullscreen.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

const mapStateToProps = ({ navigationFullscreen }) => ({
  isOpen: navigationFullscreen.isOpen,
});

export default connect(mapStateToProps, { close })(NavigationFullscreen);
