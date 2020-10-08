import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withLabel } from 'hoc';
import './Checkbox.css';

const Checkbox = ({ checked, value, name, onChange }) => {
  return (
    <div className={classNames('Checkbox-container', { 'is-checked': checked })}>
      <div className="Checkbox">
        <input
          type="checkbox"
          className="Checkbox-input"
          checked={checked}
          name={name}
          value={value}
          onChange={onChange}
        />
        <div className="Checkbox-knobs">
          <span>NO</span>
        </div>
      </div>
    </div>
    );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  'data-checkbox': true,
};

export default withLabel(Checkbox);
