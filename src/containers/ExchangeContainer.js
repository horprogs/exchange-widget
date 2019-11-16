// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  exchange,
} from '../actions/balance';
import ExchangeButton from '../components/ExchangeButton/ExchangeButton';

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = {
  exchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeButton);
