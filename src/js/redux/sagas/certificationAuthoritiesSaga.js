// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { CertificationAuthority } from 'Services';

import { constants, actions } from '../modules/certificationAuthorities';
import { certificationAuthoritiesSelector } from '../selectors/certificationAuthoritiesSelector';

export function* handleGetCertificationAuthorities(action) {
  try {
    yield put(actions.setLoadingCertificationAuthorities(true));
    const { page, filter } = action.payload;
    const {
      getCertificationAuthorities,
    } = yield CertificationAuthority.getCertificationAuthoritiesList(page, filter);
    if (getCertificationAuthorities)
      yield put(actions.updateCertificationAuthorities(getCertificationAuthorities));
  } catch (e) {
    yield put(actions.updateCertificationAuthorities({ certificationAuthorities: [] }));
  } finally {
    yield put(actions.setLoadingCertificationAuthorities(false));
  }
}

export function* handleDeleteCertificationAuthority(action) {
  try {
    const { certificationAuthority } = action.payload;
    yield CertificationAuthority.deleteCertificationAuthority(certificationAuthority);
    const certificationAuthorities = yield select(certificationAuthoritiesSelector);
    const notDeletedCertificationAuthorities = certificationAuthorities.filter(
      ({ id }) => id !== certificationAuthority,
    );
    yield put(
      actions.updateCertificationAuthorities({
        certificationAuthorities: notDeletedCertificationAuthorities,
      }),
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteMultipleCertificationAuthorities(action) {
  try {
    const { certificationAuthorityIdArray } = action.payload;
    yield CertificationAuthority.deleteMultipleCertificationAuthorities(
      certificationAuthorityIdArray,
    );
    const certificationAuthorities = yield select(certificationAuthoritiesSelector);
    const notDeletedCertificationAuthorities = certificationAuthorities.filter(
      ({ id }) => !certificationAuthorityIdArray.includes(id),
    );
    yield put(
      actions.updateCertificationAuthorities({
        certificationAuthorities: notDeletedCertificationAuthorities,
      }),
    );
  } catch (e) {
    console.log(e.message);
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
    constants.DELETE_ALL_CERTIFICATION_AUTHORITIES,
    handleDeleteMultipleCertificationAuthorities,
  );
}

export const certificationAuthoritySaga = [
  fork(watchGetCertificationAuthorities),
  fork(watchDeleteCertificationAuthority),
  fork(watchDeleteMultipleCertificationAuthorities),
];
