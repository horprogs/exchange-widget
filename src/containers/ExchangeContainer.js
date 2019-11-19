// @flow

import { connect } from 'react-redux';

import { exchange } from '../actions/balance';
import ExchangeButton from '../components/ExchangeButton/ExchangeButton';

const mapStateToProps = (state) => ({
  status: state.getIn(['statuses', 'exchangeBtn']),
});

const mapDispatchToProps = {
  exchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeButton);
