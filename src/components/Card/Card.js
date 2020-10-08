import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Card.css';

const borders = (
  <React.Fragment>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
  </React.Fragment>
);

const Card = ({ children }) => {
  return (
    <div className="Card">
      {borders}

      <div className="Card-content">
        {children}
      </div>
    </div>
  )
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
