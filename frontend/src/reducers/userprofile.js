import {
  USER_PROFILE_LOADED,
  USER_PROFILE_UPDATE_ERROR,
  AUTH_ERROR,
  STUDENT_BASIC_INFO_UPDATE,
  STUDENT_CAREER_OBJECTIVE_UPDATE,
  STUDENT_PHOTO_UPDATE,
  STUDENT_PHOTO_DELETE
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        laoding: false,
        user: payload
      };

    case STUDENT_BASIC_INFO_UPDATE:
    case STUDENT_CAREER_OBJECTIVE_UPDATE:
    case STUDENT_PHOTO_UPDATE:
    case STUDENT_PHOTO_DELETE:
      return {
        ...state,
        user: payload,
        payload: null
      };

    case USER_PROFILE_UPDATE_ERROR:
      return {
        ...state,
        payload
      };

    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        payload,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
