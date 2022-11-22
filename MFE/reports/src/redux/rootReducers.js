import { combineReducers } from 'redux';

import { devices, loading, templates, reports } from './modules';

export default combineReducers({
  devices,
  loading,
  templates,
  reports,
});
