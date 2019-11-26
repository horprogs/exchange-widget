import configureMockStore from 'redux-mock-store';
import { List, Map } from 'immutable';
import thunk from 'redux-thunk';

import { initRates, updateExchangeAmount } from '../rate';
import {
  BalanceRecord,
  NotificationRecord,
  PocketRecord,
  RateRecord,
  StatusesRecord,
} from '../../utils/records';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('rate actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('actions for initRates() should be run', () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { USD: 1.142 } }));

    const expectedActions = [
      { type: 'RATE__SET_FETCHING', payload: { isFetching: true } },
      { type: 'RATE__GET_RATE', payload: { rate: 1.142 } },
      {
        type: 'POCKETS__UPDATE_EXCHANGED',
        payload: { amount: 171.3, to: 'usd' },
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

    store.dispatch(initRates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('actions for updateExchangeAmount() for first pocket should be run', () => {
    const expectedActions = [
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

    store.dispatch(updateExchangeAmount());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('actions for updateExchangeAmount() for second pocket should be run', () => {
    const expectedActions = [
      {
        type: 'POCKETS__UPDATE_EXCHANGED',
        payload: { amount: 297.93, to: 'eur' },
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
          isActive: false,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 340.24,
          isActive: true,
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

    store.dispatch(updateExchangeAmount());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
