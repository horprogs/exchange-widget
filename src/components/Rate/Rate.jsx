// @flow

import React, { Component } from 'react';

import styles from './Rate.css';
import { POCKETS } from '../../const/common';

type Props = {};

export default function Rate(props) {
  const { recipientSign, senderSign, rate, operationType } = props;

  if (operationType === 'sender') {
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
