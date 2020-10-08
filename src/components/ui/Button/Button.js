import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import './Button.css';

const buttonKinds = {
  nostyle: 'Button--nostyle',
  primary: 'Button--primary',
  default: 'Button--default',
};

const mapKindToClassName = (kind) => {
  if (!buttonKinds[kind]) {
    console.warn(`No className found for kind ${kind}, using default`);

    return buttonKinds.default;
  }

  return buttonKinds[kind];
};

const renderIcon = (icon, position) => (
  <span className={`Button-icon${position}`}>{<Icon icon={icon} />}</span>
);

const Button = ({
  kind = 'default',
  text,
  children,
  onClick,
  type = 'button',
  className,
  disabled,
  iconRight,
  iconLeft,
  buttonRef,
  ...restProps
  }) => {
  const finalClassName = classNames('Button', {
    [mapKindToClassName(kind)]: kind,
    [className]: className,
    'is-disabled': disabled,
  });

  return (
    <button
      className={finalClassName}
      disabled={disabled}
      onClick={onClick}
      ref={buttonRef}
      type={type}
      {...restProps}
    >
      {iconLeft && renderIcon(iconLeft, 'Left')}

      <div className="Button-content">
        { text || children }
      </div>

      {iconRight && renderIcon(iconRight, 'Right')}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  kind: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
};

export default Button;
