import {
  COMPANY_ADD_NEW_EVENT,
  COMPANY_EVENT_DELETE,
  COMPANY_EVENT_UPDATE,
  EVENT_UPDATE_ERROR,
  EVENT_LOADED,
  EVENTS_LIST_LOADED,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  event: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        event: null,
      };

    case EVENT_LOADED:
    case EVENTS_LIST_LOADED:
      return {
        ...state,
        event: payload,
      };

    case COMPANY_ADD_NEW_EVENT:
    case COMPANY_EVENT_DELETE:
    case COMPANY_EVENT_UPDATE:
      return {
        ...state,
        event: payload,
        payload: null,
      };

    case EVENT_UPDATE_ERROR:
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
        event: null,
      };

    default:
      return state;
  }
}
