import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Main from '../Main';
import { Provider } from 'react-redux';

describe('exchange', () => {
  const initialState = {
    balance: [
      {
        id: 'eur',
        amount: 3000,
      },
      {
        id: 'usd',
        amount: 3000,
      },
      {
        id: 'gbp',
        amount: 3000,
      },
    ],
    pockets: [
      {
        currency: 'eur',
        operationType: 'sender',
        fieldValue: 0,
      },
      {
        currency: 'usd',
        operationType: 'recipient',
        fieldValue: 0,
      },
    ],
    rate: {
      value: 0,
      isFetching: true,
    },
    notification: {
      type: null,
      message: null,
    },
    statuses: {
      exchangeBtn: 'disabled',
    },
  };

  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
  });

  it('should render', () => {
    // container.find('[data-test="btn-exchange"]').simulate('click');
    const input = container.first('.pocket').first('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: '100' } });
    // input.simulate('keyDown', {
    //   which: 27,
    //   target: {
    //     blur() {
    //       // Needed since <EditableText /> calls target.blur()
    //       input.simulate('blur');
    //     },
    //   },
    // });

    container.find('[data-test="btn-exchange"]').simulate('click')

    console.log(container.html());
  });
});
