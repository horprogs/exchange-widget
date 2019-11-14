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
      amount: 0,
    };
  }

  onChangePocket = (pocketValue) => {
    this.props.changePocket(this.props.position, pocketValue);
  };

  onChangeAmount = (amount) => {
    let formattedAmount = amount;

    if (!isNaN(amount)) {
      if (amount[0] === '0') {
        formattedAmount = formattedAmount.slice(1);
      }

      if (formattedAmount.indexOf('.') !== -1) {
        if (
          formattedAmount.slice(formattedAmount.indexOf('.') + 1).length > 2
        ) {
          this.setState({
            amount: formattedAmount.slice(
              0,
              -(formattedAmount.slice(formattedAmount.indexOf('.')).length - 3),
            ),
          });

          this.props.changeOperation(this.props.pocketId);

          return;
        }
      }

      this.setState({
        amount: formattedAmount,
      });

      this.props.changeOperation(this.props.pocketId);
    }
  };

  getPocketSign() {
    return POCKETS.find((pocket) => pocket.value === this.props.pocketId).sign;
  }

  getRecepientSign() {
    return POCKETS.find((pocket) => pocket.value === this.props.recepient).sign;
  }

  getSenderSign() {
    return POCKETS.find((pocket) => pocket.value === this.props.sender).sign;
  }

  renderRate() {
    const { pocketId, operation, rate, recepient } = this.props;

    if (operation === 'from') {
      return (
        <div>
          1{this.getPocketSign()} = {rate}
          {this.getRecepientSign()}
        </div>
      );
    }

    return (
      <div>
        1{this.getPocketSign()} = {1 / rate}
        {this.getSenderSign()}
      </div>
    );
  }

  render() {
    const { pocketValue, amount } = this.state;
    const { pocketId, operation, rate, recepient } = this.props;

    return (
      <div className={styles.wrap}>
        {operation === 'from' ? '-' : '+'}
        <Input
          suffix={this.getPocketSign()}
          className={styles.input}
          value={amount}
          onChange={this.onChangeAmount}
        />
        <Dropdown
          options={POCKETS}
          onChange={this.onChangePocket}
          value={pocketId}
        />
        You have {this.props.amount}
        <br />
        <br />
        {this.renderRate()}
      </div>
    );
  }
}
