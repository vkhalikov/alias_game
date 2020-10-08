import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TextInput.css';

const TextInput = ({ name, value, onChange, id, className = 'TextInput', stretch, ...restProps }) => {
  const finalClassName = classNames(className, {
    [`${className}--stretch`]: stretch,
  });

  return (
    <input type="text"
           name={name}
           id={id || name}
           value={value}
           className={finalClassName}
           onChange={onChange}
           {...restProps} />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  stretch: PropTypes.bool,
};

export default TextInput;
