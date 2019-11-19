// @flow

import { connect } from 'react-redux';

import Notification from '../components/UI/Notification/Notification';

const mapStateToProps = (state) => ({
  message: state.getIn(['notification', 'message']),
  type: state.getIn(['notification', 'type']),
});

export default connect(mapStateToProps, {})(Notification);
