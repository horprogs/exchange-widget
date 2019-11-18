// @flow

import React from 'react';
import cx from 'classnames';

import Spinner from '../Spinner/Spinner';

import styles from './Button.css';

type Props = {
  type?: string,
  children: any,
  onClick: () => void,
  disabled?: boolean,
  loading?: boolean,
  dataTest?: string,
  className?: string,
};

export default function Button(props: Props) {
  const {
    children,
    type,
    onClick,
    disabled,
    dataTest,
    loading,
    className,
  } = props;

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cx(styles.wrap, className)}
      data-test={dataTest}
      data-loading={loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
  dataTest: '',
  className: '',
};
