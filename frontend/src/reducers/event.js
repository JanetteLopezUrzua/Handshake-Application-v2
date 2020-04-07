import {
  COMPANY_ADD_NEW_EVENT,
  COMPANY_EVENT_DELETE,
  EVENT_BANNER_PHOTO_UPDATE,
  EVENT_BANNER_PHOTO_DELETE,
  EVENT_UPDATE_ERROR,
  EVENT_LOADED,
  DELETE_ERRORS,
  EVENT_DESCRIPTION_UPDATE,
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
      return {
        ...state,
        event: payload,
      };

    case COMPANY_ADD_NEW_EVENT:
    case COMPANY_EVENT_DELETE:
    case EVENT_BANNER_PHOTO_UPDATE:
    case EVENT_BANNER_PHOTO_DELETE:
    case EVENT_DESCRIPTION_UPDATE:
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
