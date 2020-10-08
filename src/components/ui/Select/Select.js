import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Dropdown from '../Dropdown';
import Menu from '../Menu';
import { withLabel } from 'hoc';
import './Select.css';

const dropdownModifiers = [
  {
    name: "sameWidth",
    enabled: true,
    phase: "beforeWrite",
    requires: ["computeStyles"],
    fn: ({ state }) => {
      state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      state.elements.popper.style.width = `${
        state.elements.reference.offsetWidth
      }px`;
    }
  }
];

const Select = ({ name, value, onChange, options, placeholder = "Выберите значение" }) => {
  const onItemSelect = (newValue, close) => {
    onChange({ target: { name, value: newValue } });
    close();
  };

  return (
    <div className="Select">
      <Dropdown
        content={({ close }) => (
          <div className="Select-menu">
            <Menu options={options} onItemClick={(newValue) => { onItemSelect(newValue, close)}} />
          </div>
        )}
        modifiers={dropdownModifiers}
        offset={[0, 10]}
      >

        {({ isOpen, toggleOpenState }) => (
          <Button text={value || placeholder}
                  className="Select-button"
                  onClick={toggleOpenState}
                  iconRight={isOpen ? 'ChevronUp' : 'ChevronDown'} />
        )}

      </Dropdown>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default withLabel(Select);
