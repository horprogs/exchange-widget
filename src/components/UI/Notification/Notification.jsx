// @flow

import React from 'react';
import cx from 'classnames';

import styles from './Notification.css';

type Props = {
  message: string,
  type: string,
}

export default function Notification(props: Props) {
  const { message, type } = props;

  if (!message) {
    return null;
  }

  const isError = type === 'error';

  return (
    <div className={cx(styles.wrap, { [styles.error]: isError })}>
      {message}
    </div>
  );
}
