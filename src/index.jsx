// @flow

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { List, Map } from 'immutable';
import 'whatwg-fetch';

import reducers from './reducers';

import './vendor.css';
import Main from './containers/MainContainer';
import { BalanceRecord, NotificationRecord, PocketRecord, RateRecord, StatusesRecord } from './utils/records';

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
  // eslint-disable-next-line no-underscore-dangle, operator-linebreak
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const initialState = Map({
    balance: List([
      new BalanceRecord({
        id: 'eur',
        amount: 3000,
      }),
      new BalanceRecord({
        id: 'usd',
        amount: 3000,
      }),
      new BalanceRecord({
        id: 'gbp',
        amount: 3000,
      }),
    ]),
    pockets: List([
      new PocketRecord({
        currency: 'eur',
        fieldValue: 0,
        isActive: true,
      }),
      new PocketRecord({
        currency: 'usd',
        fieldValue: 0,
        isActive: false,
      }),
    ]),
    rate: new RateRecord({
      value: 1,
      isFetching: true,
    }),
    notification: new NotificationRecord(),
    statuses: new StatusesRecord(),
  });

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
  /* eslint-enable */

  render(store);

  // $FlowExpectedError
  if (module.hot) {
    module.hot.accept('./components/Main/Main.jsx', () => {
      render(store);
    });
  }
});
