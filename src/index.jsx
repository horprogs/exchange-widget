// @flow

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import 'whatwg-fetch';

import reducers from './reducers';

import './vendor.css';
import Main from './components/Main/Main';

function render(store) {
  const app = document.getElementById('app');

  if (!app) {
    console.error('Root element not found');
  } else {
    ReactDom.hydrate(
      <AppContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </AppContainer>,
      app,
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const q = {
    balance: [
      {
        id: 'eur',
        amount: 3000,
      },
      {
        id: 'usd',
        amount: 3000,
      },
      {
        id: 'gbp',
        amount: 3000,
      },
    ],
    pockets: [
      {
        currency: 'eur',
        operationType: 'sender',
        fieldValue: 0,
      },
      {
        currency: 'usd',
        operationType: 'recipient',
        fieldValue: 0,
      },
    ],
    rate: {
      value: 0,
      isFetching: true,
    },
    notification: {
      type: null,
      message: null,
    },
    statuses: {
      exchangeBtn: 'disabled',
    },
  };

  const store = createStore(
    reducers,
    q,
    composeEnhancers(applyMiddleware(thunk)),
  );
  /* eslint-enable */

  render(store);

  if (module.hot) {
    module.hot.accept('./components/Main/Main.jsx', () => {
      render(store);
    });
  }
});
