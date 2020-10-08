import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Button from '../Button';
import './CollapseButton.css';

const CollapseButton = ({ isOpen, onClick }) => {
  return (
    <Button className="CollapseButton" kind="nostyle" onClick={onClick}>
      {isOpen ? (
        <Icon icon="CloseIcon" size="lg"/>
      ) : (
        <Icon icon="OpenMenuIcon" size="lg" color="white"/>
      )}
    </Button>
  )
};

CollapseButton.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default CollapseButton;
