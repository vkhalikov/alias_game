import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePopper } from 'react-popper';
import './Tooltip.css';

const Tooltip = ({ children, component }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const [isOpen, setOpen] = useState(false);

  const toggleOpenState = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <div className="Tooltip-wrapper" onMouseEnter={toggleOpenState} onMouseLeave={toggleOpenState}>
      <div className="Tooltip" ref={setReferenceElement}>
        {children}
      </div>

      {isOpen && (
        <div className="Tooltip-content" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          {component}
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tooltip;
