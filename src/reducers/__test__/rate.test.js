import reducer from '../rate';
import initialState from '../../utils/initialState';
import { RATE__GET_RATE, RATE__SET_FETCHING } from '../../actionTypes/rate';
import { RateRecord } from '../../utils/records';

describe('rate reducer', () => {
  it('should handle RATE__GET_RATE', () => {
    expect(
      reducer(initialState.get('rate'), {
        type: RATE__GET_RATE,
        payload: {
          rate: 0.925823,
        },
      }),
    ).toEqual(
      new RateRecord({
        value: 0.925823,
        isFetching: true,
      }),
    );
  });

  it('should handle RATE__SET_FETCHING', () => {
    expect(
      reducer(initialState.get('rate'), {
        type: RATE__SET_FETCHING,
        payload: {
          isFetching: false,
        },
      }),
    ).toEqual(
      new RateRecord({
        value: 1,
        isFetching: false,
      }),
    );

    expect(
      reducer(
        new RateRecord({
          value: 1,
          isFetching: false,
        }),
        {
          type: RATE__SET_FETCHING,
          payload: {
            isFetching: true,
          },
        },
      ),
    ).toEqual(
      new RateRecord({
        value: 1,
        isFetching: true,
      }),
    );
  });
});
