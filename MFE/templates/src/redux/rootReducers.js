import { combineReducers } from 'redux';

import {
  loading,
  templateAttrs,
  templates,
} from './modules';

export default combineReducers({
  loading,
  templateAttrs,
  templates,
});
