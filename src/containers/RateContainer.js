// @flow

import { connect } from 'react-redux';

import { POCKETS, RECIPIENT, SENDER } from '../utils/constants';

import Rate from '../components/Rate/Rate';

const mapStateToProps = (state, props) => {
  const pockets = state.get('pockets');

  const recipient = pockets
    .find((item) => item.get('operationType') === RECIPIENT)
    .get('currency');

  const sender = pockets
    .find((item) => item.get('operationType') === SENDER)
    .get('currency');

  const recipientSign = POCKETS.find((pocket) => pocket.value === recipient)
    .sign;
  const senderSign = POCKETS.find((pocket) => pocket.value === sender).sign;

  return {
    recipientSign,
    senderSign,
    rate: state.getIn(['rate', 'value']),
    operationType: props.operationType,
  };
};

export default connect(mapStateToProps, {})(Rate);
