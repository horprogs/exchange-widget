// @flow

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';


import './vendor.css';
import Routes from './Routes';

function render(store) {
  const app = document.getElementById('app');

  if (!app) {
    console.error('Root element not found');
  } else {
    ReactDom.hydrate(
      <AppContainer>
        <Provider store={store}><Routes /></Provider>
      </AppContainer>,
      app,
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunk)),
  );
  /* eslint-enable */

  const state = store.getState();

  render(store);

  if (module.hot) {
    module.hot.accept('./Routes.js', () => {
      render(store);
    });
  }
});
