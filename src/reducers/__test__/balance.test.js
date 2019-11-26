import { List } from 'immutable';
import reducer from '../balance';
import initialState from '../../utils/initialState';
import { BALANCE__EXCHANGE } from '../../actionTypes/balance';
import { BalanceRecord } from '../../utils/records';

describe('balance reducer', () => {
  it('should handle BALANCE__EXCHANGE', () => {
    expect(
      reducer(initialState.get('balance'), {
        type: BALANCE__EXCHANGE,
        payload: {
          receivedAmount: 20.42,
          sentAmount: 15.25,
          base: 'eur',
          to: 'usd',
        },
      }),
    ).toEqual(
      List([
        new BalanceRecord({
          id: 'eur',
          amount: 2984.75,
        }),
        new BalanceRecord({
          id: 'usd',
          amount: 3020.42,
        }),
        new BalanceRecord({
          id: 'gbp',
          amount: 3000,
        }),
      ]),
    );

    expect(
      reducer(
        List([
          new BalanceRecord({
            id: 'eur',
            amount: 2984.75,
          }),
          new BalanceRecord({
            id: 'usd',
            amount: 3020.42,
          }),
          new BalanceRecord({
            id: 'gbp',
            amount: 3000,
          }),
        ]),
        {
          type: BALANCE__EXCHANGE,
          payload: {
            receivedAmount: 120.12,
            sentAmount: 125.25,
            base: 'gbp',
            to: 'eur',
          },
        },
      ),
    ).toEqual(
      List([
        new BalanceRecord({
          id: 'eur',
          amount: 3104.87,
        }),
        new BalanceRecord({
          id: 'usd',
          amount: 3020.42,
        }),
        new BalanceRecord({
          id: 'gbp',
          amount: 2874.75,
        }),
      ]),
    );
  });
});
