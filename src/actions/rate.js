import { RATE__GET_RATE, RATE__EXCHANGE } from '../actionTypes/rate';

export const getRates = () => async (dispatch, getState) => {
  const state = getState();

  const base = state.pockets.operation.from.toUpperCase();
  const to = state.pockets.operation.to.toUpperCase();

  const resp = await fetch(
    `https://api.exchangeratesapi.io/latest?symbols=${to}&base=${base}`,
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
  dispatch({
    type: RATE__EXCHANGE,
    payload: {
      rate: data.rates[to],
    },
  });
};
