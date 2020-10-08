import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';
import { usePopper } from 'react-popper';
import { useDocumentEventListener } from 'hooks';

const Dropdown = ({ content, children, modifiers, offset }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [contentElement, setContentElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, contentElement, {
    modifiers: [
      {
        name: 'offset',
        options: { offset: offset }
      },
      ...modifiers
    ],
  });

  const [isOpen, setOpen] = useState(false);

  const toggleOpenState = () => {
    setOpen(prevState => !prevState);
  };

  const close = () => {
    if (isOpen) {
      setOpen(false);
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  const contentClassName = 'Dropdown-content';

  useDocumentEventListener('click', (e) => {
    const closestContentElement = e.target.closest(`.${contentClassName}`);

    if (closestContentElement !== contentElement) {
      close();
    }
  }, isOpen);

  return (
    <div className="Dropdown" onKeyDown={closeOnEscape}>
      {typeof children === 'function' ? (
        <div className="Dropdown-target" ref={setReferenceElement}>
          {children({ isOpen, toggleOpenState, close })}
        </div>
      ) : (
        <div className="Dropdown-target" ref={setReferenceElement} onClick={toggleOpenState}>
          {children}
        </div>
      )}

      {isOpen && (
        <div
          className={contentClassName}
          ref={setContentElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {typeof content === 'function' ? content({ isOpen, toggleOpenState, close }) : content}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  modifiers: PropTypes.array,
  offset: PropTypes.array,
};

Dropdown.defaultProps = {
  modifiers: [],
  offset: [],
};

export default Dropdown;
