import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Input.css';

export default class Input extends Component {
  defaultProps: {
    type: 'text',
  };

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  onInput = (e) => {
    // console.log(e)
  }

  render() {
    const { type, value, suffix, className } = this.props;

    return (
      <div>
        <input
          type={type}
          className={cx(styles.input, className)}
          value={value}
          onChange={this.onChange}
          onInput={this.onInput}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    );
  }
}
