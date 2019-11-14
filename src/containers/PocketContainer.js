import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRates } from '../actions/rate';
import { changePocket, changeOperation } from '../actions/pockets';
import Pocket from '../components/Pocket/Pocket';

// class PocketContainer extends Component {
//   render() {
//     return
//   }
// }
const mapStateToProps = (state, props) => {
  console.log('STATE', state);
  const pocketId = state.pockets.active[props.position];
  const pocket = state.pockets.balance.find((pocket) => pocket.id === pocketId);
  const operation = Object.keys(state.pockets.operation).find(
    (key) => state.pockets.operation[key] === pocketId,
  );

  return {
    pocketId: pocket.id,
    amount: pocket.amount,
    rate: state.rate,
    position: props.position,
    operation,
    recepient: state.pockets.operation.to,
    sender: state.pockets.operation.from,
  };
};

const mapDispatchToProps = {
  getRates,
  changePocket,
  changeOperation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
