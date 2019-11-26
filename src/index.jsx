// @flow

import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import 'whatwg-fetch';

import initialState from './utils/initialState';
import reducers from './reducers';

import './vendor.css';
import Main from './containers/MainContainer';

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
