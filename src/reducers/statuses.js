// @flow

import {
  STATUSES__EXCHANGE_BTN,
} from '../actionTypes/statuses';

type Action = {
  type: string,
  payload: {
    status: string,
  },
};

type Status = {
  exchangeBtn: string,
};

export default function statuses(
  state: Status = {},
  { type: actionType, payload }: Action,
) {
  switch (actionType) {
    case STATUSES__EXCHANGE_BTN: {
      const { status } = payload;

      return { ...state, exchangeBtn: status };
    }

    default:
      return state;
  }
}
