// @flow

import React from 'react';

import styles from './Button.css';

type Props = {
  type?: string,
  children: any,
  onClick: () => void,
  disabled?: boolean,
};

export default function Button(props: Props) {
  const { children, type, onClick, disabled } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} disabled={disabled} className={styles.wrap}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
};
