// @flow

import currency from 'currency.js';

import { BALANCE__EXCHANGE } from '../actionTypes/balance';
import type { CurrencyId } from '../flow-typed/common.types';

type Action = {
  type: string,
  payload: {
    base: CurrencyId,
    to: CurrencyId,
    sentAmount: number,
    receivedAmount: number,
  },
};

type BalanceItem = { id: CurrencyId, amount: number };

export default function balance(
  state: Array<BalanceItem> = [],
  { type, payload }: Action,
) {
  switch (type) {
    case BALANCE__EXCHANGE: {
      const { base, to, sentAmount, receivedAmount } = payload;
      return state.map<BalanceItem>((item) => {
        if (item.id === base) {
          return item.merge() {
            ...item,
            amount: currency(item.amount).subtract(sentAmount).value,
          };
        }

        if (item.id === to) {
          return {
            ...item,
            amount: currency(item.amount).add(receivedAmount).value,
          };
        }

        return item;
      });
    }

    default:
      return state;
  }
}
