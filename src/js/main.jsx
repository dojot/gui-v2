import React from 'react';

import { fromJS } from 'immutable';
import ReactDOM from 'react-dom';

import { history } from './app-history';
import configureStore from './redux/configureStore';
import Root from './Root';
import App from './routes';

let initialState = {};

// rehydrate initialState for JS app
if (window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__;

  // Transform into Immutable.js collections,
  // but leave top level keys untouched for Redux
  Object.keys(initialState).forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });
}

const store = configureStore(initialState, history);

// Render the React application to the DOM
// Root component is to bootstrap Provider, Router and DevTools
ReactDOM.render(
  <Root history={history} Routes={App} store={store} />,
  document.getElementById('app-container'),
);
