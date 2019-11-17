// @flow

import React from 'react';

import styles from './Button.css';

type Props = {
  type?: string,
  children: any,
  onClick: () => void,
  disabled?: boolean,
  dataTest?: string,
};

export default function Button(props: Props) {
  const { children, type, onClick, disabled, dataTest } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.wrap}
      data-test={dataTest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  dataTest: '',
};
