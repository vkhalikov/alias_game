import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import { getKeyboardEventHandler } from 'utils/functions/getKeyboardEventHandler';
import './Menu.css';

const renderOptions = (options, onItemClick, currentFocusedItem, focusedItemRef) => {
  return options && (
    options.map((option, idx) => {
      const { text, value, id } = option;

      if (currentFocusedItem === idx) {
        return (
          <MenuItem value={value || option} text={text || option} id={id || idx} key={id || idx} onItemClick={onItemClick} ref={focusedItemRef} />
        );
      }

      return (
        <MenuItem value={value || option} text={text || option} id={id || idx} key={id || idx} onItemClick={onItemClick} />
      );
    }));
};


const Menu = ({ options, onItemClick }) => {
  const [currentFocusedItem, setFocused] = useState(0);
  const focusedItemRef = useRef(null);

  const handleArrowNavigation = getKeyboardEventHandler({
    'ArrowUp': () => {
      setFocused((currentFocused) => {
        return currentFocused > 0 ? currentFocused - 1 : currentFocused;
      })
    },
    'ArrowDown': () => {
      setFocused((currentFocused) => {
        return currentFocused < options.length - 1 ? currentFocused + 1 : currentFocused;
      })
    },
  });

  useEffect(() => {
    if (focusedItemRef.current) {
      focusedItemRef.current.focus();
    }
  }, [currentFocusedItem]);

  return (
    <div className="Menu u-custom-scroll" tabIndex={0} onKeyDown={handleArrowNavigation}>
      {renderOptions(options, onItemClick, currentFocusedItem, focusedItemRef)}
    </div>
  );
};

Menu.propTypes = {
  options: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
};

export default Menu;
