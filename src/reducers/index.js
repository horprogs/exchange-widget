// @flow

import {
  combineReducers
} from 'redux-immutable';
import rate from './rate';
import pockets from './pockets';
import balance from './balance';
import notification from './notification';
import statuses from './statuses';

export default combineReducers({
  pockets,
  rate,
  balance,
  notification,
  statuses,
});
