import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'redux';

// Styles
import 'reset-css';
import './assets/materialize/css/materialize.css';

import App from './containers/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
