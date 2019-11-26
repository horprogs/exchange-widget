import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import initialState from '../../utils/initialState';

import { showNotification } from '../notification';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('notification actions', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('actions for showNotification() should be run', (done) => {
    const expectedActions = [
      {
        type: 'NOTIFICATION__SHOW',
        payload: { message: 'Test message', type: 'info' },
      },
      { type: 'NOTIFICATION__HIDE', payload: {} },
    ];

    const store = mockStore(initialState);

    store.dispatch(showNotification('Test message'));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 3500);
  });
});
