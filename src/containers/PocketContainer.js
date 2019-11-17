// @flow

import { connect } from 'react-redux';

import {
  changePocket,
  changeOperation,
  changeAmount,
} from '../actions/pockets';
import Pocket from '../components/Pocket/Pocket';

const mapStateToProps = (state, props) => {
  const pocket = state.pockets[props.position];

  return {
    pocketId: pocket.currency,
    isRateFetching: state.rate.isFetching,
    position: props.position,
    operationType: pocket.operationType,
    fieldValue: pocket.fieldValue,
  };
};

const mapDispatchToProps = {
  changePocket,
  changeOperation,
  changeAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
