// @flow

import { connect } from 'react-redux';

import { POCKETS } from '../const/common';

import Balance from '../components/Balance/Balance';

const mapStateToProps = (state, props) => {
  const { amount } = state.balance.find((item) => item.id === props.pocketId);
  const { sign } = POCKETS.find((item) => item.value === props.pocketId);

  return {
    amount,
    sign,
  };
};

export default connect(mapStateToProps, {})(Balance);
