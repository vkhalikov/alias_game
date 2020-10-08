import React from 'react';
import './Loader.css';

const loader = (
  <div className="Loader">
    <div className="Loader-cube"></div>
    <div className="Loader-cube"></div>
    <div className="Loader-cube"></div>
  </div>
);

const Loader = ({ centered }) => (
  centered ? (
    <div className="u-fill u-flex-center">
      {loader}
    </div>
  ) : loader
);

export default Loader;
