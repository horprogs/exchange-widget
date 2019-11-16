import currency from 'currency.js';

import { BALANCE__EXCHANGE } from '../actionTypes/balance';

export default function balance(state = [], { type, payload }) {
  switch (type) {
    case BALANCE__EXCHANGE: {
      const { base, to, sentAmount, receivedAmount } = payload;

      return state.map((item) => {
        if (item.id === base) {
          return {
            ...item,
            amount: currency(item.amount).subtract(sentAmount),
          };
        }

        if (item.id === to) {
          return {
            ...item,
            amount: currency(item.amount).add(receivedAmount),
          };
        }

        return item;
      });
    }

    default:
      return state;
  }
}
