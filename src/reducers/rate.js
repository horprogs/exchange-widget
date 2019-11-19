// @flow

import type { RecordOf } from 'immutable';

import { RATE__GET_RATE, RATE__SET_FETCHING } from '../actionTypes/rate';
import { RateRecord } from '../utils/records';

type Action = {
  type: string,
  payload: {
    rate: number,
    isFetching: boolean,
  },
};

type RateT = {
  value: number,
  isFetching: boolean,
};

export default function rate(
  state: RecordOf<RateT> = new RateRecord(),
  { type, payload }: Action,
) {
  switch (type) {
    case RATE__GET_RATE: {
      return state.set('value', payload.rate);
    }

    case RATE__SET_FETCHING: {
      return state.set('isFetching', payload.isFetching);
    }

    default:
      return state;
  }
}
