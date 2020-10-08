import React from 'react';
import classNames from 'classnames';
import './FillingLayout.css';

const FillingLayout = ({component, children, centerContent }) => {
  const className = classNames('FillingLayout',
      {
        'FillingLayout--contentCentered': centerContent,
      }
    );

  return (
    <div className={className}>
      {component || children }
    </div>
  )
};

export default FillingLayout;