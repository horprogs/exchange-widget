import React, { Component } from 'react';

import styles from './Button.css';

export default class Button extends Component {
  defaultProps: {
    type: 'button'
  }

  render() {
    const { children, type, onClick } = this.props;

    return <button type={type} onClick={onClick} className={styles.wrap}>{children}</button>;
  }
}
