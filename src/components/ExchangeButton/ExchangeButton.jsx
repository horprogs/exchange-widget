// @flow

import React, { Component } from 'react';

import Button from '../UI/Button/Button';

import styles from './ExchangeButton.css';

type Props = {
  exchange: () => void,
  status: string,
};

export default function ExchangeButton(props: Props) {
  const { exchange, status } = props;

  const isDisabled = status === 'disabled';

  return <Button onClick={exchange} disabled={isDisabled}>Exchange</Button>;
}
