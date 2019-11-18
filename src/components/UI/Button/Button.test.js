/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from 'enzyme';

import Button from './Button';

describe('Button component', () => {
  it('should render properly', () => {
    const onClick = jest.fn();

    const container = mount(<Button onClick={onClick}>Button name</Button>);

    expect(container.text()).toBe('Button name');
    expect(container.length).toBe(1);
  });

  it('should click', () => {
    const onClick = jest.fn();

    const container = mount(<Button onClick={onClick}>Button name</Button>);

    container.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('should not click', () => {
    const onClick = jest.fn();

    const container = mount(<Button onClick={onClick} disabled>Button name</Button>);

    container.simulate('click');

    expect(onClick).not.toHaveBeenCalled();
  });
});
