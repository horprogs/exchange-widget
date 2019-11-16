import { POCKETS__CHANGE_POCKET, POCKETS__CHANGE_OPERATION, POCKETS__CHANGE_AMOUNT } from '../actionTypes/pockets';
import { getExchangeAmount, getRates } from './rate';

export const changePocket = (position, pocketId) => (dispatch, getState) => {
  dispatch({
    type: POCKETS__CHANGE_POCKET,
    payload: {
      position,
      pocketId,
    },
  });

  dispatch(getRates());
  // dispatch(getExchangeAmount());
};

export const changeOperation = (position) => (dispatch) => {
  dispatch({
    type: POCKETS__CHANGE_OPERATION,
    payload: {
      position,
    },
  });

  dispatch(getRates());
  // dispatch(getExchangeAmount());
};

export const changeAmount = (position, amount) => (dispatch) => {
  dispatch({
    type: POCKETS__CHANGE_AMOUNT,
    payload: {
      position,
      amount,
    },
  });

  dispatch(getExchangeAmount());
};
