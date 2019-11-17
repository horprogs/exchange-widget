// @flow

import currency from 'currency.js';

import {
  POCKETS__CHANGE_POCKET,
  POCKETS__CHANGE_OPERATION,
  POCKETS__CHANGE_AMOUNT,
} from '../actionTypes/pockets';
import { updateExchangeAmount, getRates } from './rate';
import type { CurrencyId } from '../flow-typed/common.types';
import type { Dispatch } from '../flow-typed/redux.types';
import { setStatusExchangeBtn } from './statuses';

export const changePocket = (position: number, pocketId: CurrencyId) => async (
  dispatch: Dispatch,
) => {
  dispatch({
    type: POCKETS__CHANGE_POCKET,
    payload: {
      position,
      pocketId,
    },
  });

  try {
    await dispatch(getRates());
  } catch (e) {}
};

export const changeOperation = (position: number) => async (
  dispatch: Dispatch,
) => {
  dispatch({
    type: POCKETS__CHANGE_OPERATION,
    payload: {
      position,
    },
  });

  try {
    await dispatch(getRates());
  } catch (e) {}
};

export const changeAmount = (position: number, amount: string) => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: POCKETS__CHANGE_AMOUNT,
    payload: {
      position,
      amount,
    },
  });

  if (currency(amount).value === 0) {
    dispatch(setStatusExchangeBtn('disabled'));
  } else {
    dispatch(setStatusExchangeBtn('normal'));
  }

  dispatch(updateExchangeAmount());
};
