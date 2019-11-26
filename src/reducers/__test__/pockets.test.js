import { List } from 'immutable';

import reducer from '../pockets';
import initialState from '../../utils/initialState';
import {
  POCKETS__CHANGE_AMOUNT,
  POCKETS__CHANGE_POCKET,
  POCKETS__UPDATE_EXCHANGED,
} from '../../actionTypes/pockets';
import { PocketRecord } from '../../utils/records';

describe('pockets reducer', () => {
  it('should handle POCKETS__CHANGE_AMOUNT', () => {
    expect(
      reducer(initialState.get('pockets'), {
        type: POCKETS__CHANGE_AMOUNT,
        payload: {
          position: 0,
          amount: 142.53,
        },
      }),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 142.53,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 0,
          isActive: false,
        }),
      ]),
    );

    expect(
      reducer(
        List([
          new PocketRecord({
            currency: 'eur',
            fieldValue: 142.53,
            isActive: true,
          }),
          new PocketRecord({
            currency: 'usd',
            fieldValue: 0,
            isActive: false,
          }),
        ]),
        {
          type: POCKETS__CHANGE_AMOUNT,
          payload: {
            position: 1,
            amount: 562.25,
          },
        },
      ),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 142.53,
          isActive: false,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 562.25,
          isActive: true,
        }),
      ]),
    );
  });

  it('should handle POCKETS__CHANGE_POCKET', () => {
    expect(
      reducer(initialState.get('pockets'), {
        type: POCKETS__CHANGE_POCKET,
        payload: {
          position: 0,
          pocketId: 'gbp',
        },
      }),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'gbp',
          fieldValue: 0,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 0,
          isActive: false,
        }),
      ]),
    );

    expect(
      reducer(
        List([
          new PocketRecord({
            currency: 'gbp',
            fieldValue: 0,
            isActive: true,
          }),
          new PocketRecord({
            currency: 'usd',
            fieldValue: 0,
            isActive: false,
          }),
        ]),
        {
          type: POCKETS__CHANGE_POCKET,
          payload: {
            position: 1,
            pocketId: 'gbp',
          },
        },
      ),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'usd',
          fieldValue: 0,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'gbp',
          fieldValue: 0,
          isActive: false,
        }),
      ]),
    );
  });

  it('should handle POCKETS__UPDATE_EXCHANGED', () => {
    expect(
      reducer(initialState.get('pockets'), {
        type: POCKETS__UPDATE_EXCHANGED,
        payload: {
          amount: 20.23,
          to: 'usd',
        },
      }),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 0,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 20.23,
          isActive: false,
        }),
      ]),
    );

    expect(
      reducer(List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 0,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 20.23,
          isActive: false,
        }),
      ]), {
        type: POCKETS__UPDATE_EXCHANGED,
        payload: {
          amount: 205.21,
          to: 'eur',
        },
      }),
    ).toEqual(
      List([
        new PocketRecord({
          currency: 'eur',
          fieldValue: 205.21,
          isActive: true,
        }),
        new PocketRecord({
          currency: 'usd',
          fieldValue: 20.23,
          isActive: false,
        }),
      ]),
    );
  });
});
