import {
  ALL_MESSAGES_LOADED,
  DELETE_ERRORS,
  MESSAGE_ERROR,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        message: null,
      };

    case ALL_MESSAGES_LOADED:
      return {
        ...state,
        message: payload,
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
        message: null,
      };

    default:
      return state;
  }
}
