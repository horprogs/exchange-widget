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
          <Provider store={store}>
            <Routes />
        </Provider>
      </AppContainer>,
      app,
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // const initialState = {
  //   pockets: {
  //     balance: [
  //       {
  //         id: 'eur',
  //         balance: 3000,
  //       },
  //       {
  //         id: 'usd',
  //         balance: 1000,
  //       },
  //       {
  //         id: 'gbp',
  //         balance: 6000,
  //       },
  //     ],
  //     active: [
  //       {
  //         id: 'eur',
  //         amount: 0,
  //       },
  //       {
  //         id: 'usd',
  //         amount: 0,
  //       },
  //     ],
  //     operation: {
  //       from: 'eur',
  //       to: 'usd',
  //     },
  //   },
  //   rate: {
  //     value: 0,
  //     isFetching: true,
  //   },
  // };

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
        operationType: 'recepient',
        fieldValue: 0,
      },
    ],
    rate: {
      value: 0,
      isFetching: true,
    },
  };

  const store = createStore(
    reducers,
    q,
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
