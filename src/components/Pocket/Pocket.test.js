/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { List, Map } from 'immutable';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Pocket from './Pocket';
import {
  BalanceRecord,
  NotificationRecord,
  PocketRecord,
  RateRecord,
  StatusesRecord,
} from '../../utils/records';

describe('Pocket component', () => {
  const initialState = Map({
    balance: List([
      new BalanceRecord({
        id: 'eur',
        amount: 1500,
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
      value: 1,
      isFetching: true,
    }),
    notification: new NotificationRecord(),
    statuses: new StatusesRecord(),
  });

  const mockStore = configureStore([thunk]);
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render', () => {
    const changePocket = jest.fn();
    const changeAmount = jest.fn();
    const changeOperation = jest.fn();

    const container = mount(
      <Provider store={store}>
        <Pocket
          changePocket={changePocket}
          changeAmount={changeAmount}
          changeOperation={changeOperation}
          position={0}
          pocketId="eur"
          operationType="sender"
          fieldValue={0}
          isRateFetching
        />
      </Provider>,
    );

    expect(container.find('.suffix').text()).toBe('€');
    expect(container.find('.operationSender').text()).toBe('-');
    expect(container.find('[data-test="balance"]').text()).toBe(
      'You have 1500€',
    );
  });

  it('should validate input', () => {
    const changePocket = jest.fn();
    const changeAmount = jest.fn();
    const changeOperation = jest.fn();

    const container = mount(
      <Provider store={store}>
        <Pocket
          changePocket={changePocket}
          changeAmount={changeAmount}
          changeOperation={changeOperation}
          position={0}
          pocketId="usd"
          operationType="recipient"
          fieldValue={0}
          isRateFetching
        />
      </Provider>,
    );

    const input = container.find('input');

    input.simulate('focus');

    const invalid = [
      'ab',
      '0..',
      '.',
      '.0.',
      '100..',
      '..',
      '..0',
      '!/',
      '-',
      '+',
    ];

    invalid.forEach((value) => {
      input.simulate('change', { target: { value } });
      expect(changeAmount).not.toHaveBeenCalled();
    });

    const valid = [
      { value: '1234.432', expected: '1234.43' },
      { value: '0.432', expected: '0.43' },
      {
        value: '12.1',
        expected: '12.1',
      },
      {
        value: '-121',
        expected: '121',
      },
      {
        value: '121',
        expected: '121',
      },
      {
        value: '121.00',
        expected: '121.00',
      },
    ];

    valid.forEach((item) => {
      input.simulate('change', { target: { value: item.value } });
      expect(changeAmount).toHaveBeenCalledWith(0, item.expected);
    });
  });
});
