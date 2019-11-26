// @flow

import React from 'react';
import currency from 'currency.js';

type Props = {
  recipientSign: string,
  senderSign: string,
  rate: number,
  position: number,
};

export default function Rate(props: Props) {
  const { recipientSign, senderSign, rate, position } = props;

  if (position === 0) {
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
