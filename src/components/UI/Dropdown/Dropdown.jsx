// @flow

import React, { Component } from 'react';

import DropdownOptions from './DropdownOptions';

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

  onClickBtn = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  };

  onChange = (value: string) => {
    const { onChange } = this.props;

    this.closeOptions();
    onChange(value);
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
    const { options, value } = this.props;
    const { isOpened } = this.state;

    const chosenOption = this.getChosenOption();

    return (
      <div className={styles.wrap}>
        <button
          type="button"
          className={styles.btn}
          onClick={this.onClickBtn}
          data-opened={isOpened}
        >
          {chosenOption.label}
        </button>

        {isOpened && (
          <DropdownOptions
            options={options}
            value={value}
            onChange={this.onChange}
            onClose={this.closeOptions}
          />
        )}
      </div>
    );
  }
}
