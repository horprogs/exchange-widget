import reducer from '../notification';
import initialState from '../../utils/initialState';
import {
  NOTIFICATION__HIDE,
  NOTIFICATION__SHOW,
} from '../../actionTypes/notification';
import { NotificationRecord } from '../../utils/records';

describe('notification reducer', () => {
  it('should handle NOTIFICATION__SHOW', () => {
    expect(
      reducer(initialState.get('notification'), {
        type: NOTIFICATION__SHOW,
        payload: {
          message: 'Test message',
          type: 'error',
        },
      }),
    ).toEqual(
      new NotificationRecord({
        type: 'error',
        message: 'Test message',
      }),
    );
  });

  it('should handle NOTIFICATION__HIDE', () => {
    expect(
      reducer(
        new NotificationRecord({
          type: 'error',
          message: 'Test message',
        }),
        {
          type: NOTIFICATION__HIDE,
          payload: {},
        },
      ),
    ).toEqual(
      new NotificationRecord({
        type: null,
        message: null,
      }),
    );
  });
});
