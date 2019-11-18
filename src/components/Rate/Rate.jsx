// @flow

import React from 'react';

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
        1{senderSign} = {rate}
        {recipientSign}
      </div>
    );
  }

  return (
    <div>
      1{recipientSign} = {Number((1 / rate).toFixed(10))}
      {senderSign}
    </div>
  );
}
