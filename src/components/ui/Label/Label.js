import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Label.css';

const Label = ({ label, inputName, required }) => {
  const finalClassName = classNames('Label', { 'Label--required': required });

  return (
    <label htmlFor={inputName} className={finalClassName}>{label} {required && '*'}</label>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Label;
