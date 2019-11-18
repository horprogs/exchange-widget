// @flow

import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import Dropdown from '../UI/Dropdown/Dropdown';
import BalanceContainer from '../../containers/BalanceContainer';
import RateContainer from '../../containers/RateContainer';

import { POCKETS, SENDER } from '../../const/common';

import styles from './Pocket.css';
import type { CurrencyId, OperationType } from '../../flow-typed/common.types';

type Props = {
  changePocket: (number, CurrencyId) => void,
  changeAmount: (number, string) => void,
  changeOperation: (number) => void,
  position: number,
  pocketId: CurrencyId,
  operationType: OperationType,
  fieldValue: number,
  isRateFetching: boolean,
};

export default class Pocket extends Component<Props> {
  onChangePocket = (pocketId: CurrencyId) => {
    const { changePocket, position } = this.props;

    changePocket(position, pocketId);
  };

  onChangeAmount = (amount: string) => {
    const { changeAmount, position } = this.props;
    let formattedAmount = amount.trim();

    if (Number.isNaN(Number(amount))) {
      return;
    }

    // eslint-disable-next-line
    const trailingZero =
      amount.length === 2 && amount[1] !== '.' && amount[0] === '0';

    if (trailingZero || amount[0] === '-') {
      formattedAmount = formattedAmount.slice(1);
    }

    const dotIndex = formattedAmount.indexOf('.');

    if (dotIndex !== -1) {
      if (formattedAmount.slice(dotIndex + 1).length > 2) {
        formattedAmount = formattedAmount.slice(
          0,
          -(formattedAmount.slice(dotIndex).length - 3),
        );
      }
    }
    changeAmount(position, formattedAmount);
  };

  onFocusField = () => {
    const { changeOperation, position } = this.props;

    changeOperation(position);
  };

  getPocketSign() {
    const { pocketId } = this.props;

    return POCKETS.find((pocket) => pocket.value === pocketId).sign;
  }

  renderOperationSign() {
    const { operationType } = this.props;

    if (operationType === SENDER) {
      return <div className={styles.operationSender}>-</div>;
    }

    return <div className={styles.operationRecipient}>+</div>;
  }

  render() {
    const { pocketId, fieldValue, isRateFetching, operationType } = this.props;

    return (
      <div className={styles.wrap}>
        {this.renderOperationSign()}

        <Input
          suffix={this.getPocketSign()}
          className={styles.input}
          value={String(fieldValue)}
          onChange={this.onChangeAmount}
          onFocus={this.onFocusField}
        />
        <Dropdown
          options={POCKETS}
          onChange={this.onChangePocket}
          value={pocketId}
        />

        <BalanceContainer pocketId={pocketId} />

        <div className={styles.rate}>
          {!isRateFetching && <RateContainer operationType={operationType} />}
        </div>
      </div>
    );
  }
}
