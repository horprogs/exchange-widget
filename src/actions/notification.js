// @flow

import type { Dispatch } from '../flow-typed/redux.types';

import {
  NOTIFICATION__HIDE,
  NOTIFICATION__SHOW,
} from '../actionTypes/notification';

const hideNotification = () => (dispatch: Dispatch) => {
  dispatch({
    type: NOTIFICATION__HIDE,
    payload: {},
  });
};

export const showNotification = (message: string, type: string = 'info') => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: NOTIFICATION__SHOW,
    payload: {
      message,
      type,
    },
  });

  setTimeout(() => {
    dispatch(hideNotification());
  }, 3000);
};
