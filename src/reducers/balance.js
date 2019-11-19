// @flow

import { List } from 'immutable';
import type { RecordOf } from 'immutable';
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
  state: List<RecordOf<BalanceItem>> = List([]),
  { type, payload }: Action,
) {
  switch (type) {
    case BALANCE__EXCHANGE: {
      const { base, to, sentAmount, receivedAmount } = payload;
      return state.map<RecordOf<BalanceItem>>((item) => {
        if (item.get('id') === base) {
          return item.set(
            'amount',
            currency(item.get('amount')).subtract(sentAmount).value,
          );
        }

        if (item.get('id') === to) {
          return item.set(
            'amount',
            currency(item.get('amount')).add(receivedAmount).value,
          );
        }

        return item;
      });
    }

    default:
      return state;
  }
}
