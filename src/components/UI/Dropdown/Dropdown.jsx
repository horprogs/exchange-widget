import React, { Component } from 'react';

import styles from './Dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };
    this.optionsRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickDocument);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClickDocument);
  }

  onClickDocument = (e) => {
    if (!this.optionsRef.current.contains(e.target)) {
      this.closeOptions();
    }
  }

  onClickBtn = () => {
    this.setState((prevState) => ({
      isOpened: !prevState.isOpened,
    }));
  };

  closeOptions = () => {
    this.setState({
      isOpened: false,
    });
  };

  onClickOption = (e) => {
    const { value } = e.target.dataset;

    this.props.onChange(value);
    this.closeOptions();
  };

  getChosenOption() {
    return this.props.options.find(option => option.value === this.props.value);
  }

  render() {
    const { options } = this.props;
    const { isOpened } = this.state;

    const chosenOption = this.getChosenOption();

    return (
        <div className={styles.wrap} ref={this.optionsRef}>
          <button
            className={styles.btn}
            onClick={this.onClickBtn}
            data-opened={isOpened}
        >
          {chosenOption.label}
        </button>

          {isOpened && (
        <div className={styles.options}>
              {options.map((option) => (
                <div
                  key={option.value}
                  data-value={option.value}
                  className={styles.option}
                  onClick={this.onClickOption}
                  data-active={option.value === chosenOption.value}
              >
                  {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
