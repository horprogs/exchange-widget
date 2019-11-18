// @flow

import React from 'react';
import currency from 'currency.js';

import { SENDER } from '../../const/common';
import type { OperationType } from '../../flow-typed/common.types';

type Props = {
  recipientSign: string,
  senderSign: string,
  rate: number,
  operationType: OperationType,
};

export default function Rate(props: Props) {
  const { recipientSign, senderSign, rate, operationType } = props;

  if (operationType === SENDER) {
    return (
      <div>
        1{senderSign} = {currency(rate).value}
        {recipientSign}
      </div>
    );
  }

  return (
    <div>
      1{recipientSign} = {currency(1).divide(rate).value}
      {senderSign}
    </div>
  );
}
