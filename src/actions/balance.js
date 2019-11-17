// @flow

import currency from 'currency.js';

import type { Dispatch, GetState } from '../flow-typed/redux.types';

import { BALANCE__EXCHANGE } from '../actionTypes/balance';

import { getRates } from './rate';
import { showNotification } from './notification';
import { setStatusExchangeBtn } from './statuses';

export const exchange = () => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch(setStatusExchangeBtn('disabled'));

  try {
    await dispatch(getRates());

    const state = getState();

    const sender = state.pockets.find(
      (item) => item.operationType === 'sender',
    );
    const recipient = state.pockets.find(
      (item) => item.operationType === 'recipient',
    );

    const base = sender.currency;
    const receivedAmount = recipient.fieldValue;
    const sentAmount = sender.fieldValue;

    const balance = state.balance.find((item) => item.id === base).amount;

    if (currency(balance).intValue < currency(sentAmount).intValue) {
      dispatch(
        showNotification(
          "You don't have enough money for this operation",
          'error',
        ),
      );
      return;
    }

    dispatch({
      type: BALANCE__EXCHANGE,
      payload: {
        receivedAmount,
        sentAmount,
        base,
        to: recipient.currency,
      },
    });

    setTimeout(() => {
      dispatch(showNotification('Funds successfully transferred'));
      dispatch(setStatusExchangeBtn('normal'));
    }, 1000);
  } catch (e) {
    dispatch(showNotification('Transfer funds failed. Please try later', 'error'));
    dispatch(setStatusExchangeBtn('normal'));
  }
};
