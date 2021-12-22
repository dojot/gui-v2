import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { CertificationAuthority } from 'Services';

import { constants, actions } from '../modules/certificationAuthorities';
import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { paginationControlSelector } from '../selectors/certificationAuthoritiesSelector';

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
          CertificationAuthorities: getCertificationAuthorities.certificationAuthorities,
          paginationControl: {
            currentPage: getCertificationAuthorities.currentPage,
            totalPages: getCertificationAuthorities.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificationAuthorities({ certificationAuthorities: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getCertificationAuthorities',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATION_AUTHORITIES));
  }
}

export function* handleDeleteCertificationAuthority(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_CERTIFICATION_AUTHORITY));
    const { certificationAuthority } = action.payload;
    yield call(CertificationAuthority.deleteCertificationAuthority, certificationAuthority);
    yield call(getCurrentCertificationAuthoritiesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteCertificationAuthority' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteCertificationAuthority',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_CERTIFICATION_AUTHORITY));
  }
}

export function* handleDeleteMultipleCertificationAuthorities(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES));
    const { certificationAuthoritiesIds } = action.payload;
    yield call(
      CertificationAuthority.deleteMultipleCertificationAuthorities,
      certificationAuthoritiesIds,
    );
    yield call(getCurrentCertificationAuthoritiesPageAgain);
    yield put(
      successActions.showSuccessToast({ i18nMessage: 'deleteMultipleCertificationAuthorities' }),
    );
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleCertificationAuthorities',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES));
  }
}

function* watchGetCertificationAuthorities() {
  yield takeLatest(constants.GET_CERTIFICATION_AUTHORITIES, handleGetCertificationAuthorities);
}

function* watchDeleteCertificationAuthority() {
  yield takeLatest(constants.DELETE_CERTIFICATION_AUTHORITY, handleDeleteCertificationAuthority);
}

function* watchDeleteMultipleCertificationAuthorities() {
  yield takeLatest(
    constants.DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
    handleDeleteMultipleCertificationAuthorities,
  );
}

export const certificationAuthoritySaga = [
  fork(watchGetCertificationAuthorities),
  fork(watchDeleteCertificationAuthority),
  fork(watchDeleteMultipleCertificationAuthorities),
];
