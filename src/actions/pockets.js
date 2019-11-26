// @flow

import currency from 'currency.js';

import {
  POCKETS__CHANGE_POCKET,
  POCKETS__CHANGE_AMOUNT,
} from '../actionTypes/pockets';
import { updateExchangeAmount, updateRates } from './rate';
import type { CurrencyId } from '../flow-typed/common.types';
import type { Dispatch } from '../flow-typed/redux.types';
import { setStatusExchangeBtn } from './statuses';
import { DISABLED, NORMAL } from '../utils/constants';
import { showNotification } from './notification';

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
    dispatch(setStatusExchangeBtn(DISABLED));
  } else {
    dispatch(setStatusExchangeBtn(NORMAL));
  }

  dispatch(updateExchangeAmount());
};
