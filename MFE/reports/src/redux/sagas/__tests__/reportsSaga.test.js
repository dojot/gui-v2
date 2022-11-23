import { expectSaga, testSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { Reports } from 'Services';
import { constants, actions } from '../../modules/reports';
import { actions as loadingActions } from '../../modules/loading';
import { paginationControlSelector } from '../../selectors/reportsSelector';

import {
  reportsSaga,
  getCurrentReportsPageAgain,
  handleGetReports,
  handleCreateReport,
  handleDeleteReport,
  watchGetReports,
  watchCreateReport,
  watchDeleteReport,
  watchDownloadReport,
  handleDownloadReport,
} from '../reportsSaga';

jest.mock('sharedComponents/Utils', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  downloadCSV: jest.fn(),
  downloadPDF: jest.fn(),
  downloadZIP: jest.fn(),
}));

jest.mock('sharedComponents/Hooks', () => ({
  __esModule: true,
  dispatchEvent: jest.fn(),
}));

jest.mock('sharedComponents/Constants', () => ({
  __esModule: true,
  EVENT: 'mocked',
}));

describe('reportsSaga', () => {
  beforeAll(() => {
    // Using fake timers because errorActions.addError uses Date.now()
    jest.useFakeTimers('modern');
    jest.setSystemTime(Date.now());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fakeReport = {
    id: '5ab0ff5c-6212-4337-a53e-a24871e592e3',
    name: 'Fake Report 1',
    params: [],
  };

  it('should get the current page of reports again', async () => {
    const selectPagination = matchers.select(paginationControlSelector);

    const pagination = {
      currentPage: 1,
      itemsPerPage: 10,
    };
    return expectSaga(getCurrentReportsPageAgain)
      .provide([[selectPagination, pagination]])
      .select(paginationControlSelector)
      .put(
        actions.getReports({
          page: 1,
          pageSize: 10,
        }),
      )
      .run();
  });

  it('should get a list of reports with pagination', async () => {
    const action = actions.getReports({
      page: 1,
      pageSize: 10,
    });

    const apiRequest = matchers.call.fn(Reports.findManyReports);

    const responseData = {
      findManyReports: {
        total: 10,
        page: 0,
        pageSize: 1,
        reports: [fakeReport],
      },
    };

    return expectSaga(handleGetReports, action)
      .provide([[apiRequest, responseData]])
      .put(loadingActions.addLoading(constants.GET_REPORTS))
      .put(
        actions.updateReports({
          reports: responseData.findManyReports.reports,
        }),
      )
      .put(loadingActions.removeLoading(constants.GET_REPORTS))
      .run();
  });

  it('should handle errors if fails to get reports', async () => {
    const action = actions.getReports({
      page: 1,
      pageSize: 10,
    });

    const apiRequest = matchers.call.fn(Reports.findManyReports);

    return expectSaga(handleGetReports, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.GET_REPORTS))
      .put(actions.updateReports({ reports: [] }))
      .put(loadingActions.removeLoading(constants.GET_REPORTS))
      .run();
  });

  it('should create a report', async () => {
    const successCallback = jest.fn();

    const action = actions.createReport({
      selectedDevices: {},
      initialPeriod: '',
      finalPeriod: '',
      isUniqueFileReport: true,
      fileExtension: 'pdf',
      reportName: 'report fake test',
      successCallback,
    });

    const apiRequest = matchers.call.fn(Reports.createReport);

    return expectSaga(handleCreateReport, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.CREATE_REPORT))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_REPORT))
      .run();
  });

  it('should handle errors if fails to create a report', async () => {
    const successCallback = jest.fn();

    const action = actions.createReport({
      sselectedDevices: {},
      initialPeriod: '',
      finalPeriod: '',
      isUniqueFileReport: true,
      fileExtension: 'pdf',
      reportName: 'report fake test',
      successCallback,
    });

    const apiRequest = matchers.call.fn(Reports.createReport);

    return expectSaga(handleCreateReport, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.CREATE_REPORT))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.CREATE_REPORT))
      .run();
  });

  it('should delete a report', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteReport({
      id: fakeReport.id,
      successCallback,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Reports.deleteReport);

    return expectSaga(handleDeleteReport, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.DELETE_REPORT))
      .call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_REPORT))
      .run();
  });

  it('should handle errors if fails to delete a report', async () => {
    const successCallback = jest.fn();

    const action = actions.deleteReport({
      id: fakeReport.id,
      successCallback,
      shouldGetCurrentPageAgain: false,
    });

    const apiRequest = matchers.call.fn(Reports.deleteReport);

    return expectSaga(handleDeleteReport, action)
      .provide([[apiRequest, throwError(new Error('Failed'))]])
      .put(loadingActions.addLoading(constants.DELETE_REPORT))
      .not.call(successCallback)
      .put(loadingActions.removeLoading(constants.DELETE_REPORT))
      .run();
  });

  it('should download a report', async () => {
    const action = actions.downloadReport({
      path: 'reportTestPathFake.csv',
      fileName: 'report test 1',
    });

    const apiRequest = matchers.call.fn(Reports.downloadReport);

    return expectSaga(handleDownloadReport, action)
      .provide([[apiRequest, null]])
      .put(loadingActions.addLoading(constants.DOWNLOAD_REPORT))

      .put(loadingActions.removeLoading(constants.DOWNLOAD_REPORT))
      .run();
  });

  it('should watch for an action to get reports', async () => {
    return testSaga(watchGetReports)
      .next()
      .takeLatest(constants.GET_REPORTS, handleGetReports)
      .next()
      .isDone();
  });

  it('should watch for an action to create a report', async () => {
    return testSaga(watchCreateReport)
      .next()
      .takeLatest(constants.CREATE_REPORT, handleCreateReport)
      .next()
      .isDone();
  });

  it('should watch for an action to delete a report', async () => {
    return testSaga(watchDeleteReport)
      .next()
      .takeLatest(constants.DELETE_REPORT, handleDeleteReport)
      .next()
      .isDone();
  });

  it('should watch for an action to download a report', async () => {
    return testSaga(watchDownloadReport)
      .next()
      .takeLatest(constants.DOWNLOAD_REPORT, handleDownloadReport)
      .next()
      .isDone();
  });

  it('should group and fork all watcher sagas in an array', () => {
    reportsSaga.forEach(saga => {
      expect(saga.type).toBe('FORK');
    });
  });
});
