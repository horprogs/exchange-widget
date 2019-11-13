import React, { Component } from 'react';

import styles from './Button.css';

export default class Button extends Component {
  defaultProps: {
    type: 'button'
  }

  render() {
    const { children, type } = this.props;

    return <button type={type} className={styles.wrap}>{children}</button>;
  }
}
