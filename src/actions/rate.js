import currency from 'currency.js';

import { RATE__GET_RATE, RATE__EXCHANGE, RATE__SET_FETCHING } from '../actionTypes/rate';

export async function fetchRatesFromApi(base, to) {
  return new Promise(async (resolve, reject) => {
    const resp = await fetch(
      `https://api.exchangeratesapi.io/latest?symbols=${to.toUpperCase()}&base=${base.toUpperCase()}`,
    );

    if (resp.ok) {
      const data = await resp.json();

      resolve(data.rates[to.toUpperCase()]);
      return;
    }

    reject();
  });
}

export const getExchangeAmount = () => (dispatch, getState) => {
  const state = getState();

  const amount = state.pockets.find((item) => item.operationType === 'sender')
    .fieldValue;

  // const exchanged = getFlooredFixed(amount * state.rate.value, 2);
  const exchanged = (currency(amount).multiply(state.rate.value)).value;

  console.log(exchanged, amount, state.rate.value)

  const base = state.pockets.find((item) => item.operationType === 'sender')
    .currency;
  const to = state.pockets.find((item) => item.operationType === 'recepient')
    .currency;
  dispatch({
    type: RATE__EXCHANGE,
    payload: {
      amount: exchanged,
      base,
      to,
    },
  });
};


export function dispatchRate(dispatch, rate) {
  dispatch({
    type: RATE__GET_RATE,
    payload: {
      rate,
    },
  });

  dispatch(getExchangeAmount());
}

let timerId;

export const getRates = () => async (dispatch, getState) => {
  dispatch({
    type: RATE__SET_FETCHING,
    payload: {
      isFetching: true,
    },
  });

  const state = getState();

  const base = state.pockets
    .find((item) => item.operationType === 'sender')
    .currency;

  const to = state.pockets
    .find((item) => item.operationType === 'recepient')
    .currency;

  clearInterval(timerId);

  const rate = await fetchRatesFromApi(base, to);
  dispatchRate(dispatch, rate);

  timerId = setInterval(async () => {
    const rate = await fetchRatesFromApi(base, to);
    dispatchRate(dispatch, rate);
  }, 10000);

  dispatch({
    type: RATE__SET_FETCHING,
    payload: {
      isFetching: false,
    },
  });
};

