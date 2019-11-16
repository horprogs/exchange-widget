import React, { Component } from 'react';

import Button from '../UI/Button/Button';

import styles from './ExchangeButton.css';

export default class ExchangeButton extends Component {
  render() {
    const { exchange } = this.props;
    return <Button onClick={exchange}>Exchange</Button>;
  }
}
