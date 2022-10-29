import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_REPORTS = 'app/reports/GET_REPORTS';
const CREATE_REPORT = 'app/reports/CREATE_REPORT';
const UPDATE_REPORTS = 'app/reports/UPDATE_REPORTS';
const DELETE_REPORT = 'app/reports/DELETE_REPORT';
const DOWNLOAD_REPORT = 'app/reports/DOWNLOAD_REPORT';
export const constants = {
  GET_REPORTS,
  CREATE_REPORT,
  UPDATE_REPORTS,
  DELETE_REPORT,
  DOWNLOAD_REPORT,
};

export const updateReports = createAction(UPDATE_REPORTS, payload => {
  const actionPayload = {
    reports: payload.reports,
  };

  return actionPayload;
});

export const getReports = createAction(GET_REPORTS, payload => ({
  page: payload.page,
  pageSize: payload.pageSize,
}));

export const createReport = createAction(CREATE_REPORT, payload => ({
  selectedDevices: payload.selectedDevices,
  initialPeriod: payload.initialPeriod,
  finalPeriod: payload.finalPeriod,
  isUniqueFileReport: payload.isUniqueFileReport,
  fileExtension: payload.fileExtension,
  reportName: payload.reportName,
  successCallback: payload.successCallback,
}));

export const deleteReport = createAction(DELETE_REPORT, payload => ({
  id: payload.id,
  successCallback: payload.successCallback,
  shouldGetCurrentPageAgain: payload.shouldGetCurrentPageAgain ?? true,
}));

export const downloadReport = createAction(DOWNLOAD_REPORT, payload => ({
  filename: payload.filename,
  path: payload.path,
}));

export const actions = {
  getReports,
  createReport,
  updateReports,
  deleteReport,
  downloadReport,
};

export const reducers = {
  [UPDATE_REPORTS]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    reports: [],
    paginationControl: {
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 10,
    },
  });
};

export default handleActions(reducers, initialState());
