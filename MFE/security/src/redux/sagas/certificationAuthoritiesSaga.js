import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { CertificationAuthority } from 'Services';

import { constants, actions } from '../modules/certificationAuthorities';
import { actions as loadingActions } from '../modules/loading';
import { paginationControlSelector } from '../selectors/certificationAuthoritiesSelector';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';

export function* getCurrentCertificationAuthoritiesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  yield put(
    actions.getCertificationAuthorities({
      page: {
        number: pagination.currentPage,
        size: pagination.itemsPerPage,
      },
    }),
  );
}

export function* handleGetCertificationAuthorities(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATION_AUTHORITIES));
    const { page, filter } = action.payload;

    const { getCertificationAuthorities } = yield call(
      CertificationAuthority.getCertificationAuthoritiesList,
      page,
      filter,
    );

    if (getCertificationAuthorities) {
      yield put(
        actions.updateCertificationAuthorities({
          certificationAuthorities: getCertificationAuthorities.certificationAuthorities,
          paginationControl: {
            currentPage: getCertificationAuthorities.pagination.currentPage,
            totalPages: getCertificationAuthorities.pagination.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificationAuthorities({ certificationAuthorities: [] }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "getCertificationAuthorities",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATION_AUTHORITIES));
  }
}

export function* handleDeleteCertificationAuthority(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_CERTIFICATION_AUTHORITY));
    const { fingerprint } = action.payload;
    yield call(CertificationAuthority.deleteMultipleCertificationAuthorities, [fingerprint]);
    yield call(getCurrentCertificationAuthoritiesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "deleteCertificationAuthority", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "deleteCertificationAuthority",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_CERTIFICATION_AUTHORITY));
  }
}

export function* handleDeleteMultipleCertificationAuthorities(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES));
    const { fingerprints } = action.payload;
    yield call(CertificationAuthority.deleteMultipleCertificationAuthorities, fingerprints);
    yield call(getCurrentCertificationAuthoritiesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "deleteMultipleCertificationAuthorities", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "deleteMultipleCertificationAuthorities",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES));
  }
}

export function* handleCreateCertificationAuthority(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_CERTIFICATION_AUTHORITY));
    const { caPem, successCallback } = action.payload;
    yield call(CertificationAuthority.createCertificationAuthority, { caPem });
    if (successCallback) yield call(successCallback);
    dispatchEvent(EVENT.GLOBAL_TOAST, { duration: 15000, i18nMessage: "createCertificationAuthority", type: "success", });
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: "createCertificationAuthority",
      type: "error",
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_CERTIFICATION_AUTHORITY));
  }
}

export function* watchGetCertificationAuthorities() {
  yield takeLatest(constants.GET_CERTIFICATION_AUTHORITIES, handleGetCertificationAuthorities);
}

export function* watchDeleteCertificationAuthority() {
  yield takeLatest(constants.DELETE_CERTIFICATION_AUTHORITY, handleDeleteCertificationAuthority);
}

export function* watchDeleteMultipleCertificationAuthorities() {
  yield takeLatest(
    constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
    handleDeleteMultipleCertificationAuthorities,
  );
}

export function* watchCreateCertificationAuthority() {
  yield takeLatest(constants.CREATE_CERTIFICATION_AUTHORITY, handleCreateCertificationAuthority);
}

export const certificationAuthoritySaga = [
  fork(watchGetCertificationAuthorities),
  fork(watchDeleteCertificationAuthority),
  fork(watchDeleteMultipleCertificationAuthorities),
  fork(watchCreateCertificationAuthority),
];
