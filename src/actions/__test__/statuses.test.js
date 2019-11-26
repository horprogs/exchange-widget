import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initialState from '../../utils/initialState';

import { setStatusExchangeBtn } from '../statuses';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('statuses actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('actions for setStatusExchangeBtn() should be run', () => {
    const expectedActions = [
      {
        type: 'STATUSES__EXCHANGE_BTN',
        payload: { status: 'normal' },
      },
    ];

    const store = mockStore(initialState);

    store.dispatch(setStatusExchangeBtn('normal'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
