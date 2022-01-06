import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Certificates } from 'Services';

import { constants, actions } from '../modules/certificates';
import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { paginationControlSelector } from '../selectors/certificatesSelector';

export function* getCurrentCertificatesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  yield put(
    actions.getCertificates({
      page: {
        number: pagination.currentPage,
        size: pagination.itemsPerPage,
      },
    }),
  );
}

export function* handleGetCertificates(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_CERTIFICATES));
    const { page, filter } = action.payload;
    const { getCertificateList } = yield call(Certificates.getCertificateList, page, filter);
    if (getCertificateList) {
      yield put(
        actions.updateCertificates({
          certificates: getCertificateList.certificates,
          paginationControl: {
            currentPage: getCertificateList.pagination.currentPage,
            totalPages: getCertificateList.pagination.totalPages,
            itemsPerPage: page?.size || 0,
          },
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCertificates({ certificates: [] }));
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'getCertificates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_CERTIFICATES));
  }
}

export function* handleDeleteCertificate(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_CERTIFICATE));
    const { fingerprint } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, [fingerprint]);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteCertificate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteCertificate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_CERTIFICATE));
  }
}

export function* handleDeleteMultipleCertificates(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_MULTIPLE_CERTIFICATES));
    const { fingerprints } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, fingerprints);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'deleteMultipleCertificates' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'deleteMultipleCertificates',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_MULTIPLE_CERTIFICATES));
  }
}

export function* handleDisassociateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.DISASSOCIATE_DEVICE));
    const { fingerprint } = action.payload;
    yield call(Certificates.disassociateDevice, fingerprint);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'disassociateDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'disassociateDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.DISASSOCIATE_DEVICE));
  }
}

export function* handleAssociateDevice(action) {
  try {
    yield put(loadingActions.addLoading(constants.ASSOCIATE_DEVICE));
    const { fingerprint, deviceId } = action.payload;
    yield call(Certificates.associateDevice, fingerprint, deviceId);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'associateDevice' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'associateDevice',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.ASSOCIATE_DEVICE));
  }
}

export function* handleCreateCertificateOneClick(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_ONE_CLICK));
    const { commonName } = action.payload;
    yield call(Certificates.createCertificateOneClick, commonName);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }));
  } catch (e) {
    console.log(e);
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createCertificate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_ONE_CLICK));
  }
}

export function* handleCreateCertificateCSR(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_CERTIFICATE_CSR));
    const { csrPEM } = action.payload;
    yield call(Certificates.createCertificateCSR, csrPEM);
    yield call(getCurrentCertificatesPageAgain);
    yield put(successActions.showSuccessToast({ i18nMessage: 'createCertificate' }));
  } catch (e) {
    yield put(
      errorActions.addError({
        message: e.message,
        i18nMessage: 'createCertificate',
      }),
    );
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_CERTIFICATE_CSR));
  }
}

function* watchGetCertificates() {
  yield takeLatest(constants.GET_CERTIFICATES, handleGetCertificates);
}

function* watchDeleteCertificate() {
  yield takeLatest(constants.DELETE_CERTIFICATE, handleDeleteCertificate);
}

function* watchDeleteMultipleCertificates() {
  yield takeLatest(constants.DELETE_MULTIPLE_CERTIFICATES, handleDeleteMultipleCertificates);
}

function* watchDisassociateDevice() {
  yield takeLatest(constants.DISASSOCIATE_DEVICE, handleDisassociateDevice);
}

function* watchAssociateDevice() {
  yield takeLatest(constants.ASSOCIATE_DEVICE, handleAssociateDevice);
}

function* watchCreateCertificateOneClick() {
  yield takeLatest(constants.CREATE_CERTIFICATE_ONE_CLICK, handleCreateCertificateOneClick);
}

function* watchCreateCertificateCSR() {
  yield takeLatest(constants.CREATE_CERTIFICATE_CSR, handleCreateCertificateCSR);
}

export const certificatesSaga = [
  fork(watchGetCertificates),
  fork(watchDeleteCertificate),
  fork(watchDeleteMultipleCertificates),
  fork(watchDisassociateDevice),
  fork(watchAssociateDevice),
  fork(watchCreateCertificateOneClick),
  fork(watchCreateCertificateCSR),
];
