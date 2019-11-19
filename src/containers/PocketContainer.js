// @flow

import { connect } from 'react-redux';

import {
  changePocket,
  changeOperation,
  changeAmount,
} from '../actions/pockets';
import Pocket from '../components/Pocket/Pocket';

const mapStateToProps = (state, props) => {
  const pocket = state.getIn(['pockets', props.position]);

  return {
    pocketId: pocket.get('currency'),
    operationType: pocket.get('operationType'),
    fieldValue: pocket.get('fieldValue'),
    isRateFetching: state.getIn(['rate', 'isFetching']),
    position: props.position,
  };
};

const mapDispatchToProps = {
  changePocket,
  changeOperation,
  changeAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
