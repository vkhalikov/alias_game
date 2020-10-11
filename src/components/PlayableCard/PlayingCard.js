import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { SwipeController } from 'utils/SwipeController';
import Card from '../Card';
import Button from '../ui/Button';
import './PlayingCard.css';

const highlightColors = {
  default: '#485EF1',
  error: '#FA4632',
  correct: '#35FA51',
  skip: '#FA9B1E',
};

const coloringThreshold = 30;

const PlayingCard = ({ text, onCorrectAnswer, onIncorrectAnswer, onSkip }) => {
  const cardRef = useRef();
  const [tiltDegree, setTiltDegree] = useState(0);
  const [verticalTranslation, setVerticalTranslation] = useState(0);
  const [highlightColor, setHighlightColor] = useState(highlightColors.default);

  const reset = () => {
    setTiltDegree(0);
    setVerticalTranslation(0);
    setHighlightColor(highlightColors.default);
  };

  const onSwipeUp = () => {
    onCorrectAnswer();
  };

  const onSwipeDown = () => {
    onIncorrectAnswer();
  };

  const onSwipeSide = () => {
    onSkip();
  };

  const onMove = ({ dX, dY }) => {
    const rotationDeg = Math.sign(dX) * Math.min(15, Math.abs(dX) / 3);

    if (Math.abs(dX) > coloringThreshold) {
      setHighlightColor(highlightColors.skip);
    } else if (dY > coloringThreshold) {
      setHighlightColor(highlightColors.correct);
    } else if (dY < -coloringThreshold) {
      setHighlightColor(highlightColors.error);
    } else {
      setHighlightColor(highlightColors.default);
    }

    setTiltDegree(rotationDeg);
    setVerticalTranslation(-dY / 2);
  };

  useEffect(() => {
    const swipeController = new SwipeController({
      on: {
        'move': onMove,
        'swipeUp': onSwipeUp,
        'swipeDown': onSwipeDown,
        'swipeRight': onSwipeSide,
        'swipeLeft': onSwipeSide,
        'reset': reset,
      },
    });

    const cardElement = cardRef.current;

    cardElement.addEventListener('touchstart', swipeController.handleStart);
    cardElement.addEventListener('mousedown', swipeController.handleStart);

    cardElement.addEventListener('touchmove', swipeController.handleMove);
    cardElement.addEventListener('mousemove', swipeController.handleMove);

    cardElement.addEventListener('touchend', swipeController.handleEnd);
    cardElement.addEventListener('mouseup', swipeController.handleEnd);

    cardElement.addEventListener('touchcancel', swipeController.handleCancel);
    // cardRef.current.addEventListener('mouseleave', handleCancel);

    return () => {
      cardElement.removeEventListener('touchstart', swipeController.handleStart);
      cardElement.removeEventListener('mousedown', swipeController.handleStart);

      cardElement.removeEventListener('touchmove', swipeController.handleMove);
      cardElement.removeEventListener('mousemove', swipeController.handleMove);

      cardElement.removeEventListener('touchend', swipeController.handleEnd);
      cardElement.removeEventListener('mouseup', swipeController.handleEnd);

      cardElement.removeEventListener('touchcancel', swipeController.handleCancel);
      // cardRef.current.removeEventListener('mouseleave', handleCancel);
    };
  }, []);

  const style = {
    transform: `rotate(${tiltDegree}deg) translateY(${verticalTranslation}px)`,
  };

  return (
    <div className="PlayingCard" ref={cardRef} style={style}>
      <Card secondaryColor={highlightColor}>
        <div className="PlayingCard-content">
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
    </div>
  );
};

PlayingCard.propTypes = {
  text: PropTypes.string.isRequired,
  onCorrectAnswer: PropTypes.func.isRequired,
  onIncorrectAnswer: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default PlayingCard;
