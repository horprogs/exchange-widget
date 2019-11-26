// @flow
/* global SyntheticInputEvent, HTMLInputElement */

import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.css';
import type { ReactObjRef } from '../../../flow-typed/common.types';

type Props = {
  type?: string,
  onChange: (string) => void,
  onFocus?: () => void,
  className: string,
  suffix: string,
  value: string,
};

export default class Input extends Component<Props> {
  inputRef: ReactObjRef;

  static defaultProps = {
    type: 'text',
    onFocus: () => {},
  };

  constructor() {
    super();

    this.inputRef = React.createRef();
  }

  setFocus() {
    this.inputRef.current.focus();
  }

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
          ref={this.inputRef}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    );
  }
}
