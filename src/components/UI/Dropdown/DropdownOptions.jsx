// @flow

import React, { Component } from 'react';

import styles from './Dropdown.css';
import { ReactObjRef } from '../../../flow-typed/common.types';

type Props = {
  options: Array<{ label: string, value: string }>,
  value: string,
  onChange: (string) => void,
  onClose: () => void,
};

type State = {
  activeIndex: number,
};

export default class DropdownOptions extends Component<Props, State> {
  optionsRef: ReactObjRef;

  constructor(props: Props) {
    super(props);

    const activeIndex = props.options.findIndex(
      (item) => item.value === props.value,
    );

    this.state = {
      activeIndex,
    };

    this.optionsRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydownDocument);
    document.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydownDocument);
    document.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument = (e: MouseEvent) => {
    const { onClose } = this.props;

    if (!this.optionsRef.current.contains(e.target)) {
      onClose();
    }
  };

  onClickOption = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { onChange } = this.props;

    const { target } = e;

    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    const { value } = target.dataset;

    onChange(value);
  };

  onKeydownDocument = (e: any) => {
    const { options, onChange, onClose } = this.props;
    const { activeIndex } = this.state;


    if (e.key === 'ArrowDown') {
      let newActiveIndex = activeIndex;

      if (activeIndex + 1 >= options.length) {
        newActiveIndex = 0;
      } else {
        newActiveIndex += 1;
      }

      this.setState({
        activeIndex: newActiveIndex,
      });
    }

    if (e.key === 'ArrowUp') {
      let newActiveIndex = activeIndex;

      if (activeIndex - 1 < 0) {
        newActiveIndex = options.length - 1;
      } else {
        newActiveIndex -= 1;
      }

      this.setState({
        activeIndex: newActiveIndex,
      });
    }

    if (e.key === 'Enter') {
      const { value } = options[activeIndex];

      onChange(value);
    }

    if (e.key === 'Escape') {
      onClose();
    }
  };

  render() {
    const { options } = this.props;
    const { activeIndex } = this.state;

    return (
      <div className={styles.options} ref={this.optionsRef}>
        {options.map((option, index) => (
          <button
            type="button"
            key={option.value}
            data-value={option.value}
            className={styles.option}
            onClick={this.onClickOption}
            data-active={activeIndex === index}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
}
