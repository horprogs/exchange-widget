// @flow

import type { Dispatch } from '../flow-typed/redux.types';

import { STATUSES__EXCHANGE_BTN } from '../actionTypes/statuses';

export const setStatusExchangeBtn = (status: string) => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: STATUSES__EXCHANGE_BTN,
    payload: {
      status,
    },
  });
};
