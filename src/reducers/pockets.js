// @flow

import { List } from 'immutable';
import type { RecordOf } from 'immutable';

import {
  POCKETS__CHANGE_POCKET,
  POCKETS__CHANGE_OPERATION,
  POCKETS__CHANGE_AMOUNT,
} from '../actionTypes/pockets';
import { RATE__EXCHANGE } from '../actionTypes/rate';
import type { CurrencyId, OperationType } from '../flow-typed/common.types';
import { RECIPIENT, SENDER } from '../utils/constants';

type Action = {
  type: string,
  payload: {
    pocketId: CurrencyId,
    base: CurrencyId,
    to: CurrencyId,
    position: number,
    amount: string,
  },
};

type PocketItem = {
  currency: CurrencyId,
  operationType: OperationType,
  fieldValue: string,
};

export default function pockets(
  state: List<RecordOf<PocketItem>> = List([]),
  { type, payload }: Action,
) {
  switch (type) {
    case POCKETS__CHANGE_POCKET: {
      const { position, pocketId } = payload;

      const currentCurrency = state.getIn([position, 'currency']);

      let newState = state.setIn([position, 'currency'], pocketId);

      if (newState.getIn([0, 'currency']) === newState.getIn([1, 'currency'])) {
        newState = newState.setIn([1 - position, 'currency'], currentCurrency);
      }

      return newState;
    }

    case POCKETS__CHANGE_OPERATION: {
      const { position } = payload;

      let newState;

      if (position === 0) {
        newState = state
          .setIn([0, 'operationType'], SENDER)
          .setIn([1, 'operationType'], RECIPIENT);
      } else {
        newState = state
          .setIn([1, 'operationType'], SENDER)
          .setIn([0, 'operationType'], RECIPIENT);
      }

      return newState;
    }

    case POCKETS__CHANGE_AMOUNT: {
      const { position, amount } = payload;

      return state.setIn([position, 'fieldValue'], amount);
    }

    case RATE__EXCHANGE: {
      const { to, amount } = payload;

      return state.map<RecordOf<PocketItem>>((item) => {
        if (item.get('currency') === to) {
          return item.set('fieldValue', amount);
        }

        return item;
      });
    }

    default:
      return state;
  }
}
