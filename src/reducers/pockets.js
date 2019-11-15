import {
  POCKETS__CHANGE_POCKET,
  POCKETS__CHANGE_OPERATION,
  POCKETS__CHANGE_AMOUNT,
} from '../actionTypes/pockets';
import { RATE__EXCHANGE } from '../actionTypes/rate';

export default function pockets(state = [], { type, payload }) {
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
        newState[1].operationType = 'recepient';
      } else {
        newState[1].operationType = 'sender';
        newState[0].operationType = 'recepient';
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
      const { base, to, amount } = payload;

      return state.map((item) => {
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
