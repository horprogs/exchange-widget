// @flow

import type { RecordOf } from 'immutable';

import {
  STATUSES__EXCHANGE_BTN,
} from '../actionTypes/statuses';
import { StatusesRecord } from '../utils/records';

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
  state: RecordOf<Status> = new StatusesRecord(),
  { type: actionType, payload }: Action,
) {
  switch (actionType) {
    case STATUSES__EXCHANGE_BTN: {
      const { status } = payload;

      return state.set('exchangeBtn', status);
    }

    default:
      return state;
  }
}
