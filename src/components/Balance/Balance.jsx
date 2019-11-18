// @flow

import React from 'react';

import styles from './Balance.css';

type Props = {
  amount: number,
  sign: string,
};

export default function Balance(props: Props) {
  const { amount, sign } = props;

  return (
    <div className={styles.wrap} data-test="balance">You have {amount}{sign}</div>
  );
}
