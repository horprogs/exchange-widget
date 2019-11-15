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
      // if (amount[0] === '0') {
      //   formattedAmount = formattedAmount.slice(1);
      // }

      if (formattedAmount.indexOf('.') !== -1) {
        if (
          formattedAmount.slice(formattedAmount.indexOf('.') + 1).length > 2
        ) {
          formattedAmount = formattedAmount.slice(
            0,
            -(formattedAmount.slice(formattedAmount.indexOf('.')).length - 3),
          );
        }
      }

      this.props.changeAmount(this.props.position, formattedAmount);
      this.props.exchange(formattedAmount);
      this.props.changeOperation(this.props.position);
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
    const { pocketId, operationType, rate, recepient } = this.props;

    if (operationType === 'sender') {
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
    const { pocketValue } = this.state;
    const { pocketId, operationType, rate, recepient, fieldValue } = this.props;
    console.log(operationType)
    return (
      <div className={styles.wrap}>
        {operationType === 'sender' ? '-' : '+'}
        <Input
          suffix={this.getPocketSign()}
          className={styles.input}
          value={fieldValue}
          onChange={this.onChangeAmount}
        />
        <Dropdown
          options={POCKETS}
          onChange={this.onChangePocket}
          value={pocketId}
        />
        You have {this.props.balance}
        <br />
        <br />
        {this.renderRate()}
      </div>
    );
  }
}
