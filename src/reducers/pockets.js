// @flow

import {
  POCKETS__CHANGE_POCKET,
  POCKETS__CHANGE_OPERATION,
  POCKETS__CHANGE_AMOUNT,
} from '../actionTypes/pockets';
import { RATE__EXCHANGE } from '../actionTypes/rate';
import type { CurrencyId, OperationType } from '../flow-typed/common.types';

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
}

export default function pockets(state: Array<PocketItem> = [], { type, payload }: Action) {
  switch (type) {
    case POCKETS__CHANGE_POCKET: {
      const { position, pocketId } = payload;

      const newState = [...state];

      const currentCurrency = newState[position].currency;

      newState[position].currency = pocketId;

      if (newState[0].currency === newState[1].currency) {
        newState[1 - position].currency = currentCurrency;
      }

      return newState;
    }

    case POCKETS__CHANGE_OPERATION: {
      const { position } = payload;

      const newState = [...state];

      if (position === 0) {
        newState[0].operationType = 'sender';
        newState[1].operationType = 'recipient';
      } else {
        newState[1].operationType = 'sender';
        newState[0].operationType = 'recipient';
      }

      return newState;
    }

    case POCKETS__CHANGE_AMOUNT: {
      const { position, amount } = payload;

      const newState = [...state];

      newState[position].fieldValue = amount;

      return newState;
    }

    case RATE__EXCHANGE: {
      const { to, amount } = payload;

      return state.map<PocketItem>((item) => {
        if (item.currency === to) {
          return {
            ...item,
            fieldValue: amount,
          };
        }

        return item;
      });
    }

    default:
      return state;
  }
}
