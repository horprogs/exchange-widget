/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from 'enzyme';

import Input from './Input';

describe('Input component', () => {
  it('should render properly', () => {
    const onChange = jest.fn();

    const container = mount(<Input onChange={onChange} value="1000.00" />);

    expect(container.prop('value')).toBe('1000.00');
  });

  it('should focus and change', () => {
    const onChange = jest.fn();
    const onFocus = jest.fn();

    const container = mount(
      <Input onChange={onChange} onFocus={onFocus} value="1000.00" />,
    );

    container.find('input').simulate('focus');
    expect(onFocus).toHaveBeenCalled();

    container.find('input').simulate('change', { target: { value: '100' } });

    expect(onChange).toHaveBeenCalledWith('100');
  });
});
