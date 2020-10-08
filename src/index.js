import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

// Styles
import 'reset-css';
import './index.css';

import App from './containers/App';

window._getState = store.getState;

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
