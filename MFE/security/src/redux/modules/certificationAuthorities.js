import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATION_AUTHORITIES = 'app/certificationAuthorities/GET_CERTIFICATION_AUTHORITIES';
const UPDATE_CERTIFICATION_AUTHORITIES =
  'app/certificationAuthorities/UPDATE_CERTIFICATION_AUTHORITIES';
const DELETE_CERTIFICATION_AUTHORITY =
  'app/certificationAuthorities/DELETE_CERTIFICATION_AUTHORITY';
const DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES =
  'app/certificationAuthorities/DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES';
const CREATE_CERTIFICATION_AUTHORITY =
  'app/certificationAuthorities/CREATE_CERTIFICATION_AUTHORITY';

export const constants = {
  GET_CERTIFICATION_AUTHORITIES,
  UPDATE_CERTIFICATION_AUTHORITIES,
  DELETE_CERTIFICATION_AUTHORITY,
  DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
  CREATE_CERTIFICATION_AUTHORITY,
};

export const getCertificationAuthorities = createAction(GET_CERTIFICATION_AUTHORITIES, payload => ({
  page: payload.page,
  filter: payload.filter,
  sortBy: payload.sortBy,
}));

export const updateCertificationAuthorities = createAction(
  UPDATE_CERTIFICATION_AUTHORITIES,
  payload => {
    const actionPayload = {
      certificationAuthorities: payload.certificationAuthorities,
      paginationControl: payload.paginationControl,
    };

    // If some attribute is undefined it will be removed from the state
    // So, its necessary to remove all undefined values from the payload
    Object.entries(actionPayload).forEach(([key, value]) => {
      if (value === undefined) delete actionPayload[key];
    });

    return actionPayload;
  },
);

export const deleteCertificationAuthority = createAction(
  DELETE_CERTIFICATION_AUTHORITY,
  payload => ({
    fingerprint: payload.fingerprint,
  }),
);

export const deleteMultipleCertificationAuthorities = createAction(
  DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
  payload => ({
    fingerprints: payload.fingerprints,
  }),
);

export const createCertificationAuthority = createAction(
  CREATE_CERTIFICATION_AUTHORITY,
  payload => ({
    caPem: payload.caPem,
    successCallback: payload.successCallback,
  }),
);

export const actions = {
  getCertificationAuthorities,
  updateCertificationAuthorities,
  deleteCertificationAuthority,
  deleteMultipleCertificationAuthorities,
  createCertificationAuthority,
};

export const reducers = {
  [UPDATE_CERTIFICATION_AUTHORITIES]: (state, { payload }) => {
    return state.merge({ ...payload });
  },
};

export const initialState = () => {
  return Map({
    certificationAuthorities: [],
    paginationControl: {
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: 0,
    },
  });
};

export default handleActions(reducers, initialState());
