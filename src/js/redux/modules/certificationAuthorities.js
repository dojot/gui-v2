import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';

const GET_CERTIFICATION_AUTHORITIES = 'app/certification_authorities/GET_CERTIFICATION_AUTHORITIES';
const UPDATE_CERTIFICATION_AUTHORITIES =
  'app/certification_authorities/UPDATE_CERTIFICATION_AUTHORITIES';
const DELETE_CERTIFICATION_AUTHORITY =
  'app/certification_authorities/DELETE_CERTIFICATION_AUTHORITIES';
const DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES =
  'app/certification_authorities/DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES';

export const constants = {
  GET_CERTIFICATION_AUTHORITIES,
  UPDATE_CERTIFICATION_AUTHORITIES,
  DELETE_CERTIFICATION_AUTHORITY,
  DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
};

export const getCertificationAuthorities = createAction(GET_CERTIFICATION_AUTHORITIES, payload => ({
  page: payload.page,
  filter: payload.filter,
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
    certificationAuthorityId: payload.certificationAuthorityId,
  }),
);

export const deleteMultipleCertificationAuthorities = createAction(
  DELETE_MULTIPLE_CERTIFICATION_AUTHORITIES,
  payload => ({
    certificationAuthoritiesIds: payload.certificationAuthoritiesIds,
  }),
);

export const actions = {
  getCertificationAuthorities,
  updateCertificationAuthorities,
  deleteCertificationAuthority,
  deleteMultipleCertificationAuthorities,
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
