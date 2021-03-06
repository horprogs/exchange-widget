// @flow

import currency from 'currency.js';

import type { Dispatch, GetState } from '../flow-typed/redux.types';

import { BALANCE__EXCHANGE } from '../actionTypes/balance';

import { updateRates } from './rate';
import { showNotification } from './notification';
import { setStatusExchangeBtn } from './statuses';
import { NORMAL, LOADING } from '../utils/constants';

export const exchange = () => async (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch(setStatusExchangeBtn(LOADING));

  try {
    await dispatch(updateRates());

    const state = getState();
    const pockets = state.get('pockets');

    const sender = pockets.get(0);
    const recipient = pockets.get(1);

    const base = sender.get('currency');
    const receivedAmount = recipient.get('fieldValue');
    const sentAmount = sender.get('fieldValue');

    const balance = state.get('balance').find((item) => item.get('id') === base).get('amount');

    if (currency(balance).intValue < currency(sentAmount).intValue) {
      dispatch(
        showNotification(
          "You don't have enough money for this operation",
          'error',
        ),
      );

      dispatch(setStatusExchangeBtn(NORMAL));
      return;
    }

    setTimeout(() => {
      dispatch({
        type: BALANCE__EXCHANGE,
        payload: {
          receivedAmount,
          sentAmount,
          base,
          to: recipient.get('currency'),
        },
      });
      dispatch(showNotification('Funds successfully transferred'));
      dispatch(setStatusExchangeBtn(NORMAL));
    }, 1000);
  } catch (e) {
    dispatch(showNotification('Transfer funds failed. Please try later', 'error'));
    dispatch(setStatusExchangeBtn(NORMAL));
  }
};
