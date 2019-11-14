import { POCKETS__CHANGE_POCKET, POCKETS__CHANGE_OPERATION } from '../actionTypes/pockets';

const POCKETS = [
  {
    value: 'eur',
    label: 'EUR',
    sign: '€',
  },
  {
    value: 'usd',
    label: 'USD',
    sign: '$',
  },
  {
    value: 'gbp',
    label: 'GBP',
    sign: '£',
  },
];

export default function pockets(state = {}, { type, payload }) {
  switch (type) {
    case POCKETS__CHANGE_POCKET: {
      let active = [...state.active];
      active[payload.position] = payload.pocketId;

      // TODO: refactor this
      if (active[0] === active[1]) {
        const { value } = POCKETS.find(item => item.value !== payload.pocketId);

        if (payload.position === 0) {
          active = [payload.pocketId, value]
        } else {
          active = [value, payload.pocketId]
        }
      }

      const operation = {
        from: active[0],
        to: active[1],
      }

      return { ...state, active, operation }
    }

    case POCKETS__CHANGE_OPERATION:  {
      const operation = {
        from: payload.pocketId,
        to: state.operation.from,
      }

      return { ...state, operation  }
    }

    default:
      return state
  }
}
