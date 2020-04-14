import {
  MESSAGE_ERROR,
  MESSAGES_LIST_LOADED,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  messages: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        messages: null,
      };

    case MESSAGES_LIST_LOADED:
      return {
        ...state,
        messages: payload,
      };

    case MESSAGE_ERROR:
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
        messages: null,
      };

    default:
      return state;
  }
}
