// @flow

import { RATE__GET_RATE, RATE__SET_FETCHING } from '../actionTypes/rate';

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

export default function rate(state: RateT = {}, { type, payload }: Action) {
  switch (type) {
    case RATE__GET_RATE: {
      return { ...state, value: payload.rate };
    }

    case RATE__SET_FETCHING: {
      return { ...state, isFetching: payload.isFetching };
    }

    default:
      return state;
  }
}
