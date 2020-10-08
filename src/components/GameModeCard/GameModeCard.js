import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

import './GameModeCard.css';

const GameModeCard = ({ text, onClick }) => {
  return (
    <div role="button" onClick={onClick}>
      <Card text={text} />
    </div>
  )
};

GameModeCard.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GameModeCard;