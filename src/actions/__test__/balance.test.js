import configureMockStore from 'redux-mock-store';
import { List, Map } from 'immutable';
import thunk from 'redux-thunk';

import { exchange } from '../balance';
import {
  BalanceRecord,
  NotificationRecord,
  PocketRecord,
  RateRecord,
  StatusesRecord,
} from '../../utils/records';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('balance actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('actions for exchange() should be run', () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { USD: 1.142 } }));

    const expectedActions = [
      {
        type: 'STATUSES__EXCHANGE_BTN',
        payload: { status: 'loading' },
      },
      { type: 'RATE__SET_FETCHING', payload: { isFetching: true } },
      { type: 'RATE__GET_RATE', payload: { rate: 1.142 } },
      {
        type: 'POCKETS__UPDATE_EXCHANGED',
        payload: { amount: 1142, to: 'usd' },
      },
      { type: 'RATE__SET_FETCHING', payload: { isFetching: false } },
    ];

    const initialState = Map({
      balance: List([
        new BalanceRecord({
          id: 'eur',
          amount: 3000,
        }),
        new BalanceRecord({
          id: 'usd',
          amount: 3000,
        }),
        new BalanceRecord({
          id: 'gbp',
          amount: 3000,
        }),
      ]),
      pockets: List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 1000,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 0,
          isActive: false,
        }),
      ]),
      rate: new RateRecord({
        value: 1.142,
        isFetching: true,
      }),
      notification: new NotificationRecord(),
      statuses: new StatusesRecord(),
    });

    const store = mockStore(initialState);

    return store.dispatch(exchange()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
