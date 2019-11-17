// @flow

import { connect } from 'react-redux';

import Notification from '../components/UI/Notification/Notification';

const mapStateToProps = (state) => ({
  message: state.notification.message,
  type: state.notification.type,
});

export default connect(mapStateToProps, {})(Notification);
