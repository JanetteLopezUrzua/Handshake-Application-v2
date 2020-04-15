import {
  APPLICATION_LOADED,
  DELETE_ERRORS,
  APPLICATION_UPDATE_ERROR,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
} from "../actions/types";

const initialState = {
  application: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        application: null,
      };

    case APPLICATION_LOADED:
      return {
        ...state,
        application: payload,
      };

      // case APPLICATION_STATUS_UPDATE:
      //   return {
      //     ...state,
      //     application: payload,
      //     payload: null,
      //   };

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
        application: null,
      };

    default:
      return state;
  }
}
