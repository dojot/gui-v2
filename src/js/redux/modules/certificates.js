import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATES = 'app/certificates/GET_CERTIFICATES';
const UPDATE_CERTIFICATES = 'app/certificates/UPDATE_CERTIFICATES';
const DELETE_CERTIFICATE = 'app/certificates/DELETE_CERTIFICATES';
const DELETE_MULTIPLE_CERTIFICATES = 'app/certificates/DELETE_MULTIPLE_CERTIFICATES';
const DISASSOCIATE_DEVICE = 'app/certificates/DISASSOCIATE_DEVICE';
const ASSOCIATE_DEVICE = 'app/certificates/ASSOCIATE_DEVICE';
const CREATE_CERTIFICATE_ONE_CLICK = 'app/certificates/CREATE_CERTIFICATE_ONE_CLICK';
const CREATE_CERTIFICATE_CSR = 'app/certificates/CREATE_CERTIFICATE_CSR';

export const constants = {
  GET_CERTIFICATES,
  UPDATE_CERTIFICATES,
  DELETE_CERTIFICATE,
  DELETE_MULTIPLE_CERTIFICATES,
  DISASSOCIATE_DEVICE,
  ASSOCIATE_DEVICE,
  CREATE_CERTIFICATE_ONE_CLICK,
  CREATE_CERTIFICATE_CSR,
};

export const getCertificates = createAction(GET_CERTIFICATES, payload => ({
  page: payload.page,
  filter: payload.filter,
}));

export const updateCertificates = createAction(UPDATE_CERTIFICATES, payload => {
  const actionPayload = {
    certificates: payload.certificates,
    paginationControl: payload.paginationControl,
  };

  // If some attribute is undefined it will be removed from the state
  // So, its necessary to remove all undefined values from the payload
  Object.entries(actionPayload).forEach(([key, value]) => {
    if (value === undefined) delete actionPayload[key];
  });

  return actionPayload;
});

export const deleteCertificate = createAction(DELETE_CERTIFICATE, payload => ({
  fingerprint: payload.fingerprint,
}));

export const deleteMultipleCertificates = createAction(DELETE_MULTIPLE_CERTIFICATES, payload => ({
  fingerprints: payload.fingerprints,
}));

export const disassociateDevice = createAction(DISASSOCIATE_DEVICE, payload => ({
  fingerprint: payload.fingerprint,
}));

export const associateDevice = createAction(ASSOCIATE_DEVICE, payload => ({
  fingerprint: payload.fingerprint,
  deviceId: payload.deviceId,
}));

export const createCertificateOneClick = createAction(CREATE_CERTIFICATE_ONE_CLICK, payload => ({
  commonName: payload.commonName,
}));

export const createCertificateCSR = createAction(CREATE_CERTIFICATE_CSR, payload => ({
  csrPEM: payload.csrPEM,
}));

export const actions = {
  getCertificates,
  updateCertificates,
  deleteCertificate,
  deleteMultipleCertificates,
  disassociateDevice,
  associateDevice,
  createCertificateOneClick,
  createCertificateCSR,
};

export const reducers = {
  [UPDATE_CERTIFICATES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    certificates: [],
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 0,
    },
  });
};

export default handleActions(reducers, initialState());
