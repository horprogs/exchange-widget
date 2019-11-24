// @flow

import { connect } from 'react-redux';

import { POCKETS } from '../utils/constants';

import Rate from '../components/Rate/Rate';

const mapStateToProps = (state, props) => {
  const pockets = state.get('pockets');

  const sender = pockets.getIn([0, 'currency']);
  const recipient = pockets.getIn([1, 'currency']);

  const recipientSign = POCKETS.find((pocket) => pocket.value === recipient)
    .sign;
  const senderSign = POCKETS.find((pocket) => pocket.value === sender).sign;

  return {
    recipientSign,
    senderSign,
    rate: state.getIn(['rate', 'value']),
    position: props.position,
  };
};

export default connect(mapStateToProps, {})(Rate);
