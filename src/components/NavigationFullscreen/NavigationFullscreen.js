import React, { useCallback, useEffect, useState } from 'react';
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
  const [isAnimationRequested, setAnimationRequested] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationRequested(true);
    }, 1);
  }, []);
  useDocumentEventListener('keydown', closeOnEscape);

  const finalClassName = classNames('NavigationFullscreen', { 'is-open': isAnimationRequested });

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

export default connect(null, { close })(NavigationFullscreen);
