// TODO: Handle the exception more appropriately

import { put, fork, takeLatest, select } from 'redux-saga/effects';
import { Certificates } from 'Services';

import { constants, actions } from '../modules/certificates';
import { certificatesSelector } from '../selectors/certificatesSelector';

export function* handleGetCertificates(action) {
  try {
    yield put(actions.setLoadingCertificates(true));
    const { page, filter } = action.payload;
    const { getCertificates } = yield Certificates.getCertificatesList(page, filter);
    if (getCertificates) yield put(actions.updateCertificates(getCertificates));
  } catch (e) {
    yield put(actions.updateCertificates({ certificates: [] }));
  } finally {
    yield put(actions.setLoadingCertificates(false));
  }
}

export function* handleDeleteCertificate(action) {
  try {
    const { certificate } = action.payload;
    yield Certificates.deleteCertificate(certificate);
    const certificates = yield select(certificatesSelector);
    const notDeletedCertificates = certificates.filter(({ id }) => id !== certificate);
    yield put(
      actions.updateCertificates({
        certificates: notDeletedCertificates,
      }),
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function* handleDeleteMultipleCertificates(action) {
  try {
    const { certificateIdArray } = action.payload;
    yield Certificates.deleteMultipleCertificates(certificateIdArray);
    const certificates = yield select(certificatesSelector);
    const notDeletedCertificates = certificates.filter(
      ({ id }) => !certificateIdArray.includes(id),
    );
    yield put(
      actions.updateCertificates({
        certificates: notDeletedCertificates,
      }),
    );
  } catch (e) {
    console.log(e.message);
  }
}

function* watchGetCertificates() {
  yield takeLatest(constants.GET_CERTIFICATES, handleGetCertificates);
}

function* watchDeleteCertificate() {
  yield takeLatest(constants.DELETE_CERTIFICATE, handleDeleteCertificate);
}

function* watchDeleteMultipleCertificates() {
  yield takeLatest(constants.DELETE_ALL_CERTIFICATES, handleDeleteMultipleCertificates);
}

export const certificatesSaga = [
  fork(watchGetCertificates),
  fork(watchDeleteCertificate),
  fork(watchDeleteMultipleCertificates),
];
