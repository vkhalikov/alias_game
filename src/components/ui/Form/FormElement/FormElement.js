import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../../ErrorMessage';
import { ValidationMessage } from 'utils/validators';
import { FormContext } from '../FormContext';
import './FormElement.css';

const FormElement = ({ name, inputComponent: InputComponent, render, ...inputProps }) => {
  if (!name) {
    throw new Error('prop "name" is required for a FormElement');
  }

  const { values, validationErrors, onChange } = useContext(FormContext);
  const value = values[name];
  const validationMessage = validationErrors[name];
  const invalid = !!validationMessage;

  return (
      <div className="FormElement">
        {InputComponent && (
          <InputComponent {...inputProps}
                          value={value}
                          name={name}
                          onChange={onChange}
                          invalid={invalid} />
        )}

        {render && render({ value, name, onChange, validationErrors, invalid })}

        {invalid && (
          <ErrorMessage text={validationMessage.defaultMessage} />
        )}
      </div>
  );
};

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  inputComponent: PropTypes.func,
  render: PropTypes.func,
  validationErrors: PropTypes.instanceOf(ValidationMessage),
};

export default FormElement;
