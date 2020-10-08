import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash/lang'
import { FormSchema } from './FormSchema';
import Button from '../Button';
import { FormContext } from './FormContext';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    if (!(props.schema instanceof FormSchema)) {
      throw new Error('schema should be an instance of FormSchema');
    }

    this.state = {
      values: props.schema.values,
      validationErrors: {},
    };

    this.validators = props.schema.validators;
  }

  validate = (fieldName) => {
    const validatorsForField = this.validators[fieldName];

    if (!validatorsForField) return true;

    const value = this.state.values[fieldName];
    let validationResult;

    for (let validator of validatorsForField) {
      if (validator.validate) {
        validationResult = validator.validate(value);
      } else if (isFunction(validator)) {
        validationResult = validator(value);
      }

      if (validationResult !== true) {
        break;
      }
    }

    if (validationResult === true) {
      this.resetValidationError(fieldName);
    } else {
      this.setState((prevState) => {
        return { validationErrors: { ...prevState.validationErrors, [fieldName]: validationResult } };
      });
    }

    return validationResult;
  };

  resetValidationError(fieldName) {
    if (this.state.validationErrors[fieldName]) {
      this.setState(({ validationErrors: { [fieldName]: _, ...restErrors } }) => {
        return { validationErrors: restErrors };
      });
    }
  }

  validateAll() {
    const { values } = this.state;
    const fieldNames = Object.keys(values);

    const results = fieldNames.map(this.validate);

    return !results.some((res) => res !== true);
  }

  submit = (e) => {
    e.preventDefault();

    const validationResult = this.validateAll();

    if (validationResult === true) {
      this.props.onSubmit(this.state.values);
    }
  };

  updateValue(fieldName, value, callback) {
    this.setState((prevState) => ({ values: { ...prevState.values, [fieldName]: value } }), callback);
  }

  // Adding "checked" parameter to modules checkboxes
  onValueChange = ({ target: { type, name, checked, value } }) => {
    const newValue = (type === 'checkbox') ? checked : value;

    if (newValue !== this.state.values[name]) {
      this.updateValue(name, newValue, () => {
        this.validate(name);
      });
    }
  };

  createContextProps() {
    const { values, validationErrors } = this.state;

    return {
      values,
      validationErrors,
      onChange: this.onValueChange,
    };
  }

  render() {
    const { children, className, cancelText, onCancel, submitText } = this.props;
    const contextProps = this.createContextProps();

    return (
      <form className={className} onSubmit={this.submit}>
          {typeof children === 'function' ? children(contextProps) : (
            <FormContext.Provider value={contextProps}>
              {children}
            </FormContext.Provider>
            )}

          <div className="Form-buttonGroup">
            <Button type="button" text={cancelText} onClick={onCancel} />
            <Button type="submit" text={submitText} />
          </div>
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  schema: PropTypes.instanceOf(FormSchema).isRequired,
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
};

Form.defaultProps = {
  className: 'Form--default',
  cancelText: 'Назад',
  submitText: 'Продолжить!',
};

export default Form;
