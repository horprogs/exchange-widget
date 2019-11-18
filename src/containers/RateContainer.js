// @flow

import { connect } from 'react-redux';

import { POCKETS, RECIPIENT, SENDER } from '../const/common';

import Rate from '../components/Rate/Rate';

const mapStateToProps = (state, props) => {
  const recipient = state.pockets.find(
    (item) => item.operationType === RECIPIENT,
  ).currency;

  const sender = state.pockets.find((item) => item.operationType === SENDER)
    .currency;

  const recipientSign = POCKETS.find((pocket) => pocket.value === recipient).sign;
  const senderSign = POCKETS.find((pocket) => pocket.value === sender).sign;

  return {
    recipientSign,
    senderSign,
    rate: state.rate.value,
    operationType: props.operationType,
  };
};

export default connect(mapStateToProps, {})(Rate);
