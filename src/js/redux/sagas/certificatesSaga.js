import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Certificates } from 'Services';

import { constants, actions } from '../modules/certificates';
import { actions as errorActions } from '../modules/errors';
import { actions as loadingActions } from '../modules/loading';
import { actions as successActions } from '../modules/success';
import { certificatesSelector, paginationControlSelector } from '../selectors/certificatesSelector';

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
    const { certificate } = action.payload;
    yield call(Certificates.deleteCertificate, certificate);
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
    const { certificateIdArray } = action.payload;
    yield call(Certificates.deleteMultipleCertificates, certificateIdArray);
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
    const { certificate } = action.payload;
    yield call(Certificates.disassociateDevice, certificate);
    const certificates = yield select(certificatesSelector);
    yield put(
      actions.updateCertificates({
        certificates,
      }),
    );
    yield put(successActions.showSuccessToast({ i18nMessage: 'disassociateCertificate' }));
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

export const certificatesSaga = [
  fork(watchGetCertificates),
  fork(watchDeleteCertificate),
  fork(watchDeleteMultipleCertificates),
  fork(watchDisassociateDevice),
];
