// @flow
/* global SyntheticInputEvent, HTMLInputElement */

import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.css';

type Props = {
  type?: string,
  onChange: (string) => void,
  onFocus: () => void,
  className: string,
  suffix: string,
  value: string,
}

export default class Input extends Component<Props> {
  static defaultProps = {
    type: 'text',
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;

    onChange(e.target.value);
  };

  render() {
    const { type, value, suffix, className, onFocus } = this.props;

    return (
      <div>
        <input
          type={type}
          className={cx(styles.input, className)}
          value={value}
          onChange={this.onChange}
          onFocus={onFocus}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    );
  }
}
