// @flow

import { connect } from 'react-redux';

import {
  changePocket,
  changeAmount,
} from '../actions/pockets';
import Pocket from '../components/Pocket/Pocket';

const mapStateToProps = (state, props) => {
  const pocket = state.getIn(['pockets', props.position]);

  return {
    pocketId: pocket.get('currency'),
    fieldValue: pocket.get('fieldValue'),
    isRateFetching: state.getIn(['rate', 'isFetching']),
    position: props.position,
  };
};

const mapDispatchToProps = {
  changePocket,
  changeAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pocket);
