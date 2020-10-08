import React from 'react';
import Loader from '../components/ui/Loader';

export const withLoader = ({ centered }) => (WrappedComponent) => {
  return ({ loading, ...restProps }) => {
    if (loading) {
      return <Loader centered={centered} />;
    }

    return <WrappedComponent {...restProps} />;
  }
};
