import { combineReducers } from 'redux';
import rate from './rate';
import pockets from './pockets';

export default combineReducers({
  pockets,
  rate,
});
