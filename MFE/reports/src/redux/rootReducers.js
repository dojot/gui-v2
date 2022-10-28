import { combineReducers } from 'redux';

import { devices, loading, templates, certificates, reports } from './modules';

export default combineReducers({
  devices,
  loading,
  templates,
  certificates,
  reports,
});
