// @flow

import { connect } from 'react-redux';

import { POCKETS } from '../utils/constants';

import Balance from '../components/Balance/Balance';

const mapStateToProps = (state, props) => {
  const amount = state
    .get('balance')
    .find((item) => item.get('id') === props.pocketId)
    .get('amount');

  const { sign } = POCKETS.find((item) => item.value === props.pocketId);

  return {
    amount,
    sign,
  };
};

export default connect(mapStateToProps, {})(Balance);
