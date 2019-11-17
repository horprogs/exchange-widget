// @flow

import currency from 'currency.js';

import type { Dispatch, GetState } from '../flow-typed/redux.types';

import {
  RATE__GET_RATE,
  RATE__EXCHANGE,
  RATE__SET_FETCHING,
} from '../actionTypes/rate';
import { showNotification } from './notification';

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

  const sender = state.pockets.find((item) => item.operationType === 'sender');
  const recipient = state.pockets.find((item) => item.operationType === 'recipient');

  const amount = sender.fieldValue;
  const base = sender.currency;
  const to = recipient.currency;

  const exchanged = currency(amount).multiply(state.rate.value).value;

  dispatch({
    type: RATE__EXCHANGE,
    payload: {
      amount: exchanged,
      base,
      to,
    },
  });
};

export async function updateRates(dispatch, base, to) {
  const rate = await fetchRatesFromApi(base, to);
  dispatch({
    type: RATE__GET_RATE,
    payload: {
      rate,
    },
  });

  dispatch(updateExchangeAmount());
}

let timerId;

export const getRates = () => async (
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

  const base = state.pockets.find((item) => item.operationType === 'sender')
    .currency;

  const to = state.pockets.find((item) => item.operationType === 'recipient')
    .currency;

  clearInterval(timerId);

  try {
    timerId = setInterval(async () => {
      try {
        await updateRates(dispatch, base, to);
      } catch (e) {
        dispatch(
          showNotification(
            'Cannot fetch exchange rates. Please try later.',
            'error',
          ),
        );
      }
    }, 7000);

    await updateRates(dispatch, base, to);

    dispatch({
      type: RATE__SET_FETCHING,
      payload: {
        isFetching: false,
      },
    });
  } catch (e) {
    dispatch(
      showNotification(
        'Cannot fetch exchange rates. Please try later.',
        'error',
      ),
    );

    throw e;
  }
};
