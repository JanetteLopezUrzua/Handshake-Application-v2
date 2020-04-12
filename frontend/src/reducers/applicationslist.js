import {
  APPLICATION_UPDATE_ERROR,
  APPLICATIONS_LIST_LOADED,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  applications: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        applications: null,
      };

    case APPLICATIONS_LIST_LOADED:
      return {
        ...state,
        applications: payload,
      };

    case APPLICATION_UPDATE_ERROR:
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
        applications: null,
      };

    default:
      return state;
  }
}
