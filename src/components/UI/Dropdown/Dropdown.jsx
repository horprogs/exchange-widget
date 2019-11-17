// @flow

import React, { Component } from 'react';

import styles from './Dropdown.css';
import { ReactObjRef } from '../../../flow-typed/common.types';

type Props = {
  options: Array<{ label: string, value: string }>,
  value: string,
  onChange: (string) => void,
};

type State = {
  isOpened: boolean,
};

export default class Dropdown extends Component<Props, State> {
  optionsRef: ReactObjRef;

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpened: false,
    };
    this.optionsRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument);
    // document.addEventListener('keydown', this.onKeydownDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument);
  }

  // onKeydownDocument = (e) => {
  //   console.log(e);
  // };

  onClickDocument = (e: MouseEvent) => {
    if (!this.optionsRef.current.contains(e.target)) {
      this.closeOptions();
    }
  };

  onClickBtn = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  };

  onClickOption = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { onChange } = this.props;

    const { target } = e;

    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const { value } = target.dataset;

    onChange(value);
    this.closeOptions();
  };

  getChosenOption() {
    const { options, value } = this.props;

    return options.find((option) => option.value === value) || {};
  }

  closeOptions = () => {
    this.setState({
      isOpened: false,
    });
  };

  render() {
    const { options } = this.props;
    const { isOpened } = this.state;

    const chosenOption = this.getChosenOption();

    return (
      <div className={styles.wrap} ref={this.optionsRef}>
        <button
          type="button"
          className={styles.btn}
          onClick={this.onClickBtn}
          data-opened={isOpened}
        >
          {chosenOption.label}
        </button>

        {isOpened && (
          <div className={styles.options}>
            {options.map((option) => (
              <button
                type="button"
                key={option.value}
                data-value={option.value}
                className={styles.option}
                onClick={this.onClickOption}
                data-active={option.value === chosenOption.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}
