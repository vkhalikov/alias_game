import React from 'react';
import { Label } from 'components/ui';

export const withLabel = (WrappedComponent) => {
  return function withLabel({ label, name, required, ...restProps }) {
    return label ? (
      <div className="withLabel">
        <Label label={label} inputName={name} required={required} />
        <WrappedComponent name={name} required={required} {...restProps} />
      </div>
    ) : (
      <WrappedComponent name={name} required={required} {...restProps} />
    )
  };
};

