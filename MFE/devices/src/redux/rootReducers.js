import { combineReducers } from 'redux';

import {
    devices,
    errors,
    success,
    loading,
    templates,
    certificates
} from './modules';

export default combineReducers({
    devices,
    errors,
    success,
    loading,
    templates,
    certificates
});
