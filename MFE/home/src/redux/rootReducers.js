import { combineReducers } from 'redux';

import { devices, loading } from './modules';

export default combineReducers({
  devices,
  loading,
});
