import { RATE__GET_RATE, RATE__EXCHANGE } from '../actionTypes/rate';

export const getRates = () => async (dispatch, getState) => {
  const state = getState();

  const base = state.pockets.find((item) => item.operationType === 'sender')
    .currency;
  const to = state.pockets.find((item) => item.operationType === 'recepient')
    .currency;

  const resp = await fetch(
    `https://api.exchangeratesapi.io/latest?symbols=${to.toUpperCase()}&base=${base.toUpperCase()}`,
  );

  if (resp.ok) {
    const data = await resp.json();

    dispatch({
      type: RATE__GET_RATE,
      payload: {
        rate: data.rates[to],
      },
    });
  }
};

export const exchange = (amount) => async (dispatch, getState) => {
  const state = getState();

  const exchanged = Math.round(amount * state.rate * 100) / 100;

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
