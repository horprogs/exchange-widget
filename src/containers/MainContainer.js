// @flow

import { connect } from 'react-redux';

import Main from '../components/Main/Main';
import { initRates } from '../actions/rate';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  initRates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
