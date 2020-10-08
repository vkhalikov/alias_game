import React from 'react';
import PropTypes from 'prop-types';
import { withLabel } from 'hoc';
import './Slider.css';

const Slider = ({ name, value, onChange, min, max, step }) => {
  return (
    <div className="Slider">
      <input
        type="range"
        className="Slider-input"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />

      <div className="Slider-values">
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

Slider.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
};

export default withLabel(Slider);
