import {
  USER_PROFILE_LOADED,
  AUTH_ERROR,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  // COMPANY_BASIC_INFO_UPDATE,
  // COMPANY_CONTACT_INFO_UPDATE,
  // COMPANY_PHOTO_UPDATE,
  // COMPANY_PHOTO_DELETE,
  // COMPANY_NAME_UPDATE,
  // COMPANY_USER_PROFILE_UPDATE_ERROR,
  DELETE_ERRORS,
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        user: null,
        isAuthenticated: true,
        laoding: false,
      };

    case USER_PROFILE_LOADED:
      // case COMPANY_BASIC_INFO_UPDATE:
      // case COMPANY_CONTACT_INFO_UPDATE:
      // case COMPANY_PHOTO_UPDATE:
      // case COMPANY_PHOTO_DELETE:
      // case COMPANY_NAME_UPDATE:
      return {
        ...state,
        isAuthenticated: true,
        laoding: false,
        user: payload,
      };

      // case COMPANY_USER_PROFILE_UPDATE_ERROR:
      // return {
      //   ...state,
      //   payload,
      // };

    case DELETE_ERRORS:
      return {
        ...state,
        payload: null,
      };

    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        user: null,
        payload,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
