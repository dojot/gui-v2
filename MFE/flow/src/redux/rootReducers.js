import { combineReducers } from 'redux';

import { flows, loading } from './modules';

export default combineReducers({
  flows,
  loading,
});
