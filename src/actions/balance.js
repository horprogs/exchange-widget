import currency from 'currency.js';

import { BALANCE__EXCHANGE } from '../actionTypes/balance';

import { fetchRatesFromApi, dispatchRate, getExchangeAmount } from './rate';

export const exchange = () => async (dispatch, getState) => {
  let state = getState();

  const base = state.pockets
    .find((item) => item.operationType === 'sender')
    .currency;

  const to = state.pockets
    .find((item) => item.operationType === 'recepient')
    .currency;

  const baseAmount = state.pockets.find(
    (item) => item.operationType === 'sender',
  ).fieldValue;

  const rate = await fetchRatesFromApi(base, to);
  dispatchRate(dispatch, rate);

  // dispatch(getExchangeAmount());

  state = getState();

  const receivedAmount = state.pockets.find(
    (item) => item.operationType === 'recepient',
  ).fieldValue;

  const sentAmount = state.pockets.find(
    (item) => item.operationType === 'sender',
  ).fieldValue;

  const balance = state.balance.find(item => item.id === base).amount;

  if (currency(balance).intValue < currency(sentAmount).intValue) {
    alert('Your balance is less than amount');
    return;
  }


  dispatch({
    type: BALANCE__EXCHANGE,
    payload: {
      receivedAmount,
      sentAmount,
      base,
      to,
    },
  });
};
