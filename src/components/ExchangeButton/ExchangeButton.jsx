// @flow

import React from 'react';

import Button from '../UI/Button/Button';

import styles from './ExchangeButton.css';

import { DISABLED, LOADING } from '../../utils/constants';

type Props = {
  exchange: () => void,
  status: string,
};

export default function ExchangeButton(props: Props) {
  const { exchange, status } = props;

  const isDisabled = status === DISABLED;
  const isLoading = status === LOADING;

  return (
    <Button
      onClick={exchange}
      disabled={isDisabled}
      loading={isLoading}
      dataTest="btn-exchange"
      className={styles.btn}
    >
      Exchange
    </Button>
  );
}
