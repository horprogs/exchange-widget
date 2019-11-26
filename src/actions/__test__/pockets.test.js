import configureMockStore from 'redux-mock-store';
import { List, Map } from 'immutable';
import thunk from 'redux-thunk';

import { changeAmount, changePocket } from '../pockets';
import {
  BalanceRecord,
  NotificationRecord,
  PocketRecord,
  RateRecord,
  StatusesRecord,
} from '../../utils/records';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('pockets actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('actions for changeAmount() should be run', () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { USD: 1.142 } }));

    const expectedActions = [
      {
        type: 'POCKETS__CHANGE_AMOUNT',
        payload: { position: 0, amount: 150 },
      },
      {
        type: 'STATUSES__EXCHANGE_BTN',
        payload: { status: 'NORMAL' },
      },
      {
        type: 'POCKETS__UPDATE_EXCHANGED',
        payload: { amount: 171.3, to: 'usd' },
      },
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
          fieldValue: 150,
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

    store.dispatch(changeAmount(0, 150));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('actions for changeAmount() without amount should be run', () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { USD: 1.142 } }));

    const expectedActions = [
      {
        type: 'POCKETS__CHANGE_AMOUNT',
        payload: { position: 0, amount: 0 },
      },
      {
        type: 'STATUSES__EXCHANGE_BTN',
        payload: { status: 'disabled' },
      },
      {
        type: 'POCKETS__UPDATE_EXCHANGED',
        payload: { amount: 0, to: 'usd' },
      },
    ];

    const initialState = Map({
      balance: List([
        new BalanceRecord({
          id: 'eur',
          amount: 150,
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
          fieldValue: 0,
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

    store.dispatch(changeAmount(0, 0));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('actions for changePocket() should be run', () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { USD: 1.142 } }));

    const expectedActions = [
      {
        type: 'POCKETS__CHANGE_POCKET',
        payload: { position: 0, pocketId: 'usd' },
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

    store.dispatch(changePocket(0, 'usd')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
