// @flow

import currency from 'currency.js';

import type { Dispatch, GetState } from '../flow-typed/redux.types';

import {
  RATE__GET_RATE,
  RATE__EXCHANGE,
  RATE__SET_FETCHING,
} from '../actionTypes/rate';
import { showNotification } from './notification';

import { RECIPIENT, SENDER, FETCH_RATES_INTERVAL } from '../const/common';
import type { CurrencyId } from '../flow-typed/common.types';

async function fetchRatesFromApi(base: string, to: string) {
  const resp = await fetch(
    `https://api.exchangeratesapi.io/latest?symbols=${to.toUpperCase()}&base=${base.toUpperCase()}`,
  );

  if (resp.ok) {
    const data = await resp.json();

    if (typeof data.rates[to.toUpperCase()] !== 'number') {
      throw new Error('Rate is invalid');
    }

    return data.rates[to.toUpperCase()];
  }

  throw new Error('Response is invalid');
}

export const updateExchangeAmount = () => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const state = getState();

  const sender = state.get('pockets').find((item) => item.get('operationType') === SENDER);
  const recipient = state.get('pockets').find(
    (item) => item.get('operationType') === RECIPIENT,
  );

  const amount = sender.get('fieldValue');
  const base = sender.get('currency');
  const to = recipient.get('currency');

  const exchanged = currency(amount).multiply(state.getIn(['rate', 'value'])).value;

  dispatch({
    type: RATE__EXCHANGE,
    payload: {
      amount: exchanged,
      base,
      to,
    },
  });
};

async function getRates(dispatch: Dispatch, base: CurrencyId, to: CurrencyId) {
  const rate = await fetchRatesFromApi(base, to);
  dispatch({
    type: RATE__GET_RATE,
    payload: {
      rate,
    },
  });
}

let timerId;

export const updateRates = () => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({
    type: RATE__SET_FETCHING,
    payload: {
      isFetching: true,
    },
  });

  const state = getState();

  const base = state.get('pockets').find((item) => item.get('operationType') === SENDER)
    .currency;

  const to = state.get('pockets').find((item) => item.get('operationType') === RECIPIENT)
    .currency;

  clearInterval(timerId);

  timerId = setInterval(async () => {
    try {
      await getRates(dispatch, base, to);
      dispatch(updateExchangeAmount());
    } catch (e) {
      dispatch(
        showNotification(
          'Cannot fetch exchange rates. Please try later.',
          'error',
        ),
      );
    }
  }, FETCH_RATES_INTERVAL);

  await getRates(dispatch, base, to);
  dispatch(updateExchangeAmount());

  dispatch({
    type: RATE__SET_FETCHING,
    payload: {
      isFetching: false,
    },
  });
};
