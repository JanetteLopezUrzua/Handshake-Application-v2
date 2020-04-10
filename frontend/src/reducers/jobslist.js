import {
  JOB_UPDATE_ERROR,
  JOBS_LIST_LOADED,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  jobs: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        jobs: null,
      };

    case JOBS_LIST_LOADED:
      return {
        ...state,
        jobs: payload,
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

    case LOG_OUT:
      return {
        jobs: null,
      };

    default:
      return state;
  }
}
