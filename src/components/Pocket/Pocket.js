import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import Dropdown from '../UI/Dropdown/Dropdown';

import styles from './Pocket.css';

const POCKETS = [
  {
    value: 'eur',
    label: 'EUR',
    sign: '€',
  },
  {
    value: 'usd',
    label: 'USD',
    sign: '$',
  },
  {
    value: 'gbp',
    label: 'GBP',
    sign: '£',
  },
];

export default class Pocket extends Component {
  constructor() {
    super();

    this.state = {
      pocketValue: POCKETS[0].value,
      amount: 0,
    };
  }

  onChangePocket = (pocketValue) => {
    this.setState({
      pocketValue,
    });
  };

  onChangeAmount = (amount) => {
    this.setState({
      amount,
    });
  };

  getPocketSign() {
    return POCKETS.find((pocket) => pocket.value === this.state.pocketValue)
      .sign;
  }

  render() {
    const { pocketValue, amount } = this.state;

    return (
      <div className={styles.wrap}>
        <Input
          suffix={this.getPocketSign()}
          className={styles.input}
          value={amount}
          onChange={this.onChangeAmount}
        />

        <Dropdown
          options={POCKETS}
          onChange={this.onChangePocket}
          value={pocketValue}
        />


      </div>
    );
  }
}
