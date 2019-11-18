// @flow

import React from 'react';

import Button from '../UI/Button/Button';

import { DISABLED } from '../../const/common';

type Props = {
  exchange: () => void,
  status: string,
};

export default function ExchangeButton(props: Props) {
  const { exchange, status } = props;

  const isDisabled = status === DISABLED;

  return (
    <Button onClick={exchange} disabled={isDisabled} dataTest="btn-exchange">
      Exchange
    </Button>
  );
}
