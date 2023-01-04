import { put, fork, takeLatest, call } from 'redux-saga/effects';
import { EVENT } from 'sharedComponents/Constants';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { getErrorTranslation } from 'sharedComponents/Utils';

import { Flows } from '../../adapters/services';
import { constants, actions } from '../modules/flows';
import { actions as loadingActions } from '../modules/loading';

export function* handleGetNodes() {
  try {
    yield put(loadingActions.addLoading(constants.GET_NODES));
    const { getAllFlows } = yield call(Flows.getFlowsList, '');
    if (getAllFlows) yield put(actions.updateFlow(getAllFlows));
  } catch (e) {
    yield put(actions.updateFlow({ flows: {} }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getNodess',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_NODES));
  }
}
export function* handleGetFlows(sort) {
  try {
    yield put(loadingActions.addLoading(constants.GET_FLOWS));
    const { orderBy, order } = sort.payload;
    const { getAllFlows } = yield call(Flows.getFlowsList, '');
    if (getAllFlows && orderBy) {
      yield put(actions.sortFlows(orderBy, order, getAllFlows.flows));
    } else {
      yield put(actions.updateFlow(getAllFlows));
    }
  } catch (e) {
    yield put(actions.updateFlow({ flows: {} }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getFlows',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_FLOWS));
  }
}

export function* handleGetFlowById(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_FLOW_BY_ID));
    const { flowid } = action.payload;
    const data = yield call(Flows.getFlowByID, flowid);
    const { getFlowByID } = data;
    if (getFlowByID) yield put(actions.setFlow(getFlowByID));
  } catch (e) {
    yield put(actions.setFlow({}));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getFlowByID',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_FLOW_BY_ID));
  }
}

export function* handleDeleteFlow(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_FLOW));
    const { flowID } = action.payload;
    yield call(Flows.deleteFlow, flowID);
    const { getAllFlows } = yield call(Flows.getFlowsList, '');
    if (getAllFlows) yield put(actions.updateFlow(getAllFlows));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteFlow',
      type: 'success',
    });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteFlow',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_FLOW));
  }
}

export function* handleEditFlow(action) {
  try {
    yield put(loadingActions.addLoading(constants.EDIT_FLOW));
    const { flowID, flowObj, successCallback } = action.payload;
    yield call(Flows.updateFlow, flowID, flowObj);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'editFlow',
      type: 'success',
    });
    if (successCallback) yield call(successCallback);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'editFlow', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.EDIT_FLOW));
  }
}

export function* handleCreateFlow(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_FLOW));
    const { flow, successCallback } = action.payload;
    yield call(Flows.createFlow, flow);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'createFlow',
      type: 'success',
    });
    if (successCallback) yield call(successCallback);
  } catch (e) {
    const i18nMessage = getErrorTranslation(e, 'createFlow', {
      devices_label_key: 'deviceUniqueLabel',
    });

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      i18nMessage,
      type: 'error',
      duration: 15000,
      message: e.message,
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_FLOW));
  }
}

export function* watchGetFlows() {
  yield takeLatest(constants.GET_FLOWS, handleGetFlows);
}

export function* watchGetFlowById() {
  yield takeLatest(constants.GET_FLOW_BY_ID, handleGetFlowById);
}

export function* watchDeleteFlow() {
  yield takeLatest(constants.DELETE_FLOW, handleDeleteFlow);
}

export function* watchEditFlow() {
  yield takeLatest(constants.EDIT_FLOW, handleEditFlow);
}

export function* watchCreateFlow() {
  yield takeLatest(constants.CREATE_FLOW, handleCreateFlow);
}

export function* watchGetNodes() {
  yield takeLatest(constants.GET_NODES, handleGetNodes);
}

export const FlowSaga = [
  fork(watchGetFlows),
  fork(watchGetFlowById),
  fork(watchDeleteFlow),
  fork(watchEditFlow),
  fork(watchCreateFlow),
  fork(watchGetNodes),
];
