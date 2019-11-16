import { combineReducers } from 'redux';
import rate from './rate';
import pockets from './pockets';
import balance from './balance';

export default combineReducers({
  pockets,
  rate,
  balance,
});
