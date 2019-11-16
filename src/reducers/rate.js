import {
  RATE__GET_RATE,
  RATE__EXCHANGE,
  RATE__SET_FETCHING,
} from '../actionTypes/rate';

export default function rate(state = {}, { type, payload }) {
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
