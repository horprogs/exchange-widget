// @flow

import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import Dropdown from '../UI/Dropdown/Dropdown';
import BalanceContainer from '../../containers/BalanceContainer';
import RateContainer from '../../containers/RateContainer';

import { POCKETS } from '../../utils/constants';

import styles from './Pocket.css';
import type { CurrencyId, ReactObjRef } from '../../flow-typed/common.types';

type Props = {
  changePocket: (number, CurrencyId) => void,
  changeAmount: (number, string) => void,
  position: number,
  pocketId: CurrencyId,
  fieldValue: number,
  isRateFetching: boolean,
};

export default class Pocket extends Component<Props> {
  inputRef: ReactObjRef;

  constructor() {
    super();

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const { position } = this.props;

    if (position === 0) {
      this.inputRef.current.setFocus();
    }
  }

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

  getPocketSign() {
    const { pocketId } = this.props;

    return POCKETS.find((pocket) => pocket.value === pocketId).sign;
  }

  renderOperationSign() {
    const { position } = this.props;

    if (position === 0) {
      return (
        <>
          <div className={styles.operationSender}>-</div>
          <div className={styles.operationLabel}>From</div>
        </>
      );
    }

    return (
      <>
        <div className={styles.operationRecipient}>+</div>
        <div className={styles.operationLabel}>To</div>
      </>
    );
  }

  render() {
    const { pocketId, fieldValue, isRateFetching, position } = this.props;

    return (
      <div className={styles.wrap}>
        {this.renderOperationSign()}

        <Input
          suffix={this.getPocketSign()}
          className={styles.input}
          value={String(fieldValue)}
          onChange={this.onChangeAmount}
          ref={this.inputRef}
        />
        <Dropdown
          options={POCKETS}
          onChange={this.onChangePocket}
          value={pocketId}
        />

        <BalanceContainer pocketId={pocketId} />

        <div className={styles.rate}>
          {!isRateFetching && <RateContainer position={position} />}
        </div>
      </div>
    );
  }
}
