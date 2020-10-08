import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Timer.css';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const Timer = ({ value }) => {
  const [displayTime, setDisplayTime] = useState(value);

  useEffect(() => {
    const iid = setInterval(() => {
      setDisplayTime((currTime) => currTime - 1);
    }, 1000);

    return () => {
      clearInterval(iid);
    }
  }, [value])

  return (
    <div className="Timer">
      {displayTime > 0 ? formatTime(displayTime) : 'Время вышло'}
    </div>
  );
};

Timer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Timer;
