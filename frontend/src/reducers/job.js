import {
  COMPANY_ADD_NEW_JOB,
  COMPANY_JOB_DELETE,
  JOB_UPDATE_ERROR,
  JOB_LOADED,
  DELETE_ERRORS,
  JOB_INFO_UPDATE,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  job: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        job: null,
      };

    case JOB_LOADED:
      return {
        ...state,
        job: payload,
      };

    case COMPANY_ADD_NEW_JOB:
    case JOB_INFO_UPDATE:
      return {
        ...state,
        job: payload,
        payload: null,
      };

    case JOB_UPDATE_ERROR:
      return {
        ...state,
        payload,
      };

    case DELETE_ERRORS:
      return {
        ...state,
        payload: null,
      };

    case COMPANY_JOB_DELETE:
    case LOG_OUT:
      return {
        job: null,
      };

    default:
      return state;
  }
}
