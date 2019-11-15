// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRates, exchange } from '../actions/rate';
import { changePocket, changeOperation, changeAmount } from '../actions/pockets';
import Pocket from '../components/Pocket/Pocket';

// class PocketContainer extends Component {
//   render() {
//     return
//   }
// }
const mapStateToProps = (state, props) => {
  console.log('STATE', state);
  // const pocketId = state.pockets.active[props.position].id;
  // const amount = state.pockets.active[props.position].amount;
  // // const pocket = state.pockets.balance.find((pocket) => pocket.id === pocketId);
  // const operation = Object.keys(state.pockets.operation).find(
  //   (key) => state.pockets.operation[key] === pocketId,
  // );

  const pocket = state.pockets[props.position];
  const recepient = state.pockets.find(pocket => pocket.operationType === 'recepient').currency;
  const sender = state.pockets.find(pocket => pocket.operationType === 'sender').currency;

  console.log(recepient, sender);

  return {
    pocketId: pocket.currency,
    balance: 0,
    rate: state.rate,
    position: props.position,
    operationType: pocket.operationType,
    fieldValue: pocket.fieldValue,
    recepient,
    sender,
  };
};

const mapDispatchToProps = {
  getRates,
  changePocket,
  changeOperation,
  changeAmount,
  exchange,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
