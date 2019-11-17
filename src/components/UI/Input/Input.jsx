// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.css';

type Props = {
  type: string,
  onChange: (string) => void,
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
    const { type, value, suffix, className, ...props } = this.props;

    return (
      <div>
        <input
          {...props}
          type={type}
          className={cx(styles.input, className)}
          value={value}
          onChange={this.onChange}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    );
  }
}
