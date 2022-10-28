import { put, fork, takeLatest, select, call } from 'redux-saga/effects';
import { Reports } from '../../adapters/services';
import {
  getUserInformation,
  getErrorTranslation,
  toBase64,
  downloadCSV,
  downloadPDF,
  downloadZIP,
} from 'sharedComponents/Utils';
import { dispatchEvent } from 'sharedComponents/Hooks';
import { EVENT } from 'sharedComponents/Constants';

import { constants, actions } from '../modules/reports';
import { actions as loadingActions } from '../modules/loading';
import { paginationControlSelector } from '../selectors/reportsSelector';

export function* getCurrentDevicesPageAgain() {
  const pagination = yield select(paginationControlSelector);
  console.log(pagination);
  yield put(
    actions.getReports({
      page: pagination.currentPage,
      pageSize: pagination.itemsPerPage,
    }),
  );
}

export function* handleGetReports(action) {
  try {
    yield put(loadingActions.addLoading(constants.GET_REPORTS));
    const { page, pageSize } = action.payload;
    console.log(page, pageSize);
    const { findManyReports } = yield call(Reports.findManyReports, { page, pageSize });

    if (findManyReports) {
      yield put(actions.updateReports({ reports: findManyReports.reports }));
    }
  } catch (e) {
    yield put(actions.updateReports({ reports: [] }));
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'getReports',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.GET_REPORTS));
  }
}

export function* handleCreateReport(action) {
  try {
    yield put(loadingActions.addLoading(constants.CREATE_REPORT));

    const {
      selectedDevices,
      initialPeriod,
      finalPeriod,
      isUniqueFileReport,
      fileExtension,
      reportName,
      successCallback,
    } = action.payload;

    const devicesToReport = [];

    for (let i of Object.values(selectedDevices)) {
      const parsedAttrs = [];

      Object.values(i.attrs).forEach(attr =>
        parsedAttrs.push({
          id: attr.id,
          label: attr.label,
          type: attr.type,
          valueType: attr.valueType,
        }),
      );

      const parsedDevice = {
        id: i.id,
        label: i.label,
        attrs: parsedAttrs,
      };

      devicesToReport.push(parsedDevice);
    }

    const parsedReport = {
      name: reportName,
      format: fileExtension,
      singleReportFile: isUniqueFileReport,
      initialDate: initialPeriod,
      finalDate: finalPeriod,
      devices: devicesToReport,
    };

    yield call(Reports.createReport, parsedReport);

    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'createReport',
      type: 'success',
    });

    if (successCallback) yield call(successCallback);
  } catch (error) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: error.message,
      i18nMessage: 'createReport',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.CREATE_REPORT));
  }
}

export function* handleDeleteReport(action) {
  try {
    yield put(loadingActions.addLoading(constants.DELETE_REPORT));
    const { id, successCallback, shouldGetCurrentPageAgain } = action.payload;
    yield call(Reports.deleteReport, id);
    if (successCallback) yield call(successCallback);
    if (shouldGetCurrentPageAgain) yield call(getCurrentDevicesPageAgain);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      i18nMessage: 'deleteReport',
      type: 'success',
    });
  } catch (e) {
    console.log(e.message);
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'deleteReport',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DELETE_REPORT));
  }
}

export function* handleDownloadReport(action) {
  try {
    yield put(loadingActions.addLoading(constants.DOWNLOAD_REPORT));
    const { path } = action.payload;
    const { downloadReport } = yield call(Reports.downloadReport, path);

    if (path.includes('.csv')) {
      yield call(downloadCSV, downloadReport, 'test.csv');
    }

    if (path.includes('.pdf')) {
      yield call(downloadPDF, downloadReport, 'testPDF.pdf');
    }

    if (path.includes('.zip')) {
      yield call(downloadZIP, downloadReport, 'testZIP.zip');
    }
  } catch (e) {
    dispatchEvent(EVENT.GLOBAL_TOAST, {
      duration: 15000,
      message: e.message,
      i18nMessage: 'downloadReport',
      type: 'error',
    });
  } finally {
    yield put(loadingActions.removeLoading(constants.DOWNLOAD_REPORT));
  }
}

export function* watchGetReports() {
  yield takeLatest(constants.GET_REPORTS, handleGetReports);
}

export function* watchCreateReport() {
  yield takeLatest(constants.CREATE_REPORT, handleCreateReport);
}

export function* watchDeleteReport() {
  yield takeLatest(constants.DELETE_REPORT, handleDeleteReport);
}

export function* watchDownloadReport() {
  yield takeLatest(constants.DOWNLOAD_REPORT, handleDownloadReport);
}

export const reportsSaga = [
  fork(watchGetReports),
  fork(watchCreateReport),
  fork(watchDeleteReport),
  fork(watchDownloadReport),
];
