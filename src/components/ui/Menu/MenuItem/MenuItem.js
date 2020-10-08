import React from 'react';
import './MenuItem.css';

const MenuItem = ({ text, value, id, onItemClick }, ref) => {
  const selectItem = () => {
    if (onItemClick) {
      onItemClick(value, id);
    }
  };

  const selectOnEnter = (e) => {
    if (e.key === 'Enter') {
      selectItem();
    }
  };

  return (
    <div className="Menu-item" tabIndex={-1} ref={ref} onClick={selectItem} onKeyDown={selectOnEnter}>
      {text || value}
    </div>
  );
};

export default React.forwardRef(MenuItem);
