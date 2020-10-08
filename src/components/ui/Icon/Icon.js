import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as icons  from './icons';
import './Icon.css';

const Icon = ({ icon, size = 'md', color }) => {
  const IconComponent = icons[icon];

  if (!IconComponent) {
    throw new Error(`No Icon found for name ${icon}, check spelling`)
  }

  const className = classNames('Icon', {
    [`Icon--${size}`]: size,
    [`Icon--${color}`]: color,
  });

  return (
    <span className={className}>
      {<IconComponent />}
    </span>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'x-lg']),
  color: PropTypes.string,
};

export default Icon;