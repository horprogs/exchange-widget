// @flow

import currency from 'currency.js';

import type { Dispatch, GetState } from '../flow-typed/redux.types';

import { RATE__GET_RATE, RATE__SET_FETCHING } from '../actionTypes/rate';

import { POCKETS__UPDATE_EXCHANGED } from '../actionTypes/pockets';

import { showNotification } from './notification';

import { FETCH_RATES_INTERVAL } from '../utils/constants';
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

  const pockets = state.get('pockets');

  const sender = pockets.find((item) => item.get('isActive'));

  const recipient = pockets.find((item) => !item.get('isActive'));

  const amount = sender.get('fieldValue');
  const to = recipient.get('currency');

  let exchanged;

  if (pockets.getIn([0, 'isActive'])) {
    exchanged = currency(amount).multiply(state.getIn(['rate', 'value'])).value;
  } else {
    exchanged = currency(amount).divide(state.getIn(['rate', 'value'])).value;
  }

  dispatch({
    type: POCKETS__UPDATE_EXCHANGED,
    payload: {
      amount: exchanged,
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

  const pockets = state.get('pockets');

  const base = pockets.getIn([0, 'currency']);

  const to = pockets.getIn([1, 'currency']);

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

export const initRates = () => async (dispatch: Dispatch) => {
  try {
    await dispatch(updateRates());
  } catch (e) {
    dispatch(
      showNotification(
        'Cannot fetch exchange rates. Please try later.',
        'error',
      ),
    );
  }
};
