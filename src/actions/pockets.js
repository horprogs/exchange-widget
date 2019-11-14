import { POCKETS__CHANGE_POCKET, POCKETS__CHANGE_OPERATION } from '../actionTypes/pockets';
import { getRates } from './rate';

export const changePocket = (position, pocketId) => (dispatch) => {

  dispatch({
    type: POCKETS__CHANGE_POCKET,
    payload: {
      position,
      pocketId,
    },
  });

  dispatch(getRates());

}

export const changeOperation = (pocketId) => (dispatch) => {
  dispatch({
    type: POCKETS__CHANGE_OPERATION,
    payload: {
      pocketId,
    },
  });
}
