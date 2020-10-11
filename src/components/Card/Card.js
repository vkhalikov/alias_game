import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Card.css';

const defaultSecondaryColor = '#485EF1';

const borders = (
  <React.Fragment>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
    <span className="Card-animatedBorder"></span>
  </React.Fragment>
);

const Card = ({ children, secondaryColor = defaultSecondaryColor }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    cardRef.current.style.setProperty('--card-secondary-color', secondaryColor);
  }, [secondaryColor]);

  return (
    <div className="Card" ref={cardRef}>
      {borders}

      <div className="Card-content">
        {children}
      </div>
    </div>
  )
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  secondaryColor: PropTypes.string,
};

export default Card;
