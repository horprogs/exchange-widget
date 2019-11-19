/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from 'enzyme';

import Dropdown from './Dropdown';

describe('Dropdown component', () => {
  let options;

  beforeEach(() => {
    options = [
      {
        value: 'eur',
        label: 'EUR',
      },
      {
        value: 'usd',
        label: 'USD',
      },
    ];
  });

  it('should render properly', () => {
    const onChange = jest.fn();

    const container = mount(
      <Dropdown
        options={options}
        value={options[0].value}
        onChange={onChange}
      />,
    );

    expect(container.find('button').prop('data-opened')).toBeFalsy();
    expect(container.find('button').text()).toBe(options[0].label);
  });

  it('should open and change', () => {
    const onChange = jest.fn();

    const container = mount(
      <Dropdown
        options={options}
        value={options[0].value}
        onChange={onChange}
      />,
    );

    container.find('button').simulate('click');
    expect(container.find('button.btn').prop('data-opened')).toBeTruthy();

    container.find('.option[data-value="usd"]').simulate('click');
    expect(container.find('button').prop('data-opened')).toBeFalsy();

    expect(onChange).toHaveBeenCalledWith('usd');
  });
});
