import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '../Card';
import Button from '../ui/Button';
import './PlayingCard.css';

const PlayingCard = ({ text, onCorrectAnswer, onIncorrectAnswer, onSkip }) => (
  <Card>
    <div className="PlayingCard">
      <div className="PlayingCard-text">
        { text }
      </div>

      <div className="PlayingCard-buttons">
        <Button text="Yes" onClick={onCorrectAnswer} className="PlayingCard-button PlayingCard-buttonSuccess" />
        <Button text="No" onClick={onIncorrectAnswer} className="PlayingCard-button PlayingCard-buttonFailure" />
        <Button text="Skip" onClick={onSkip} className="PlayingCard-button PlayingCard-buttonSkip" />
      </div>
    </div>
  </Card>
);

PlayingCard.propTypes = {
  text: PropTypes.string.isRequired,
  onCorrectAnswer: PropTypes.func.isRequired,
  onIncorrectAnswer: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default PlayingCard;
