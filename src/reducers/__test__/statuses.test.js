import reducer from '../statuses';
import initialState from '../../utils/initialState';
import {
  STATUSES__EXCHANGE_BTN,
} from '../../actionTypes/statuses';
import { StatusesRecord } from '../../utils/records';

describe('statuses reducer', () => {
  it('should handle STATUSES__EXCHANGE_BTN', () => {
    expect(
      reducer(initialState.get('statuses'), {
        type: STATUSES__EXCHANGE_BTN,
        payload: {
          status: 'normal',
        },
      }),
    ).toEqual(
      new StatusesRecord({
        exchangeBtn: 'normal',
      }),
    );
  });
});
