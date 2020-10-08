import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ErrorMessage.css';

const ErrorMessage = ({ text }) => {
  return <div className="ErrorMessage">{text}</div>
};

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
