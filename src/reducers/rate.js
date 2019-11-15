import { RATE__GET_RATE, RATE__EXCHANGE } from '../actionTypes/rate';

export default function rate(state = 1, { type, payload }) {
  switch (type) {
    case RATE__GET_RATE:
      return payload.rate;

    default:
      return state
  }
}
