import React from 'react';
import classNames from 'classnames';

import './SplitPanel.css';

const SplitPanel = ({ children, withDividers }) => {
  const itemWidth = 100 / children.length;
  const items = React.Children.map(children, (item) => {
    return (
      <div className="SplitPanel-item" style={{width: itemWidth+'%'}}>
        {item}
      </div>
    );
  });
  const className = classNames(
    'SplitPanel',
    { 'SplitPanel--withDividers': withDividers }
  );

  return (
    <div className={className}>
      {items}
    </div>
  )
};

export default SplitPanel;