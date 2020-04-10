import {
  EVENT_UPDATE_ERROR,
  UPCOMING_EVENTS_LIST_LOADED,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  events: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        events: null,
      };

    case UPCOMING_EVENTS_LIST_LOADED:
      return {
        ...state,
        events: payload,
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
        events: null,
      };

    default:
      return state;
  }
}
