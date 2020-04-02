import {
  USER_PROFILE_LOADED,
  USER_PROFILE_UPDATE_ERROR,
  AUTH_ERROR,
  STUDENT_BASIC_INFO_UPDATE,
  STUDENT_CAREER_OBJECTIVE_UPDATE,
  STUDENT_PHOTO_UPDATE,
  STUDENT_PHOTO_DELETE,
  STUDENT_CONTACT_INFO_UPDATE,
  STUDENT_SKILLSET_UPDATE,
  STUDENT_SKILL_DELETE,
  STUDENT_ADD_NEW_SCHOOL,
  STUDENT_SCHOOL_DELETE,
  STUDENT_SCHOOL_UPDATE
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
    case STUDENT_CONTACT_INFO_UPDATE:
    case STUDENT_SKILLSET_UPDATE:
    case STUDENT_SKILL_DELETE:
    case STUDENT_ADD_NEW_SCHOOL:
    case STUDENT_SCHOOL_DELETE:
    case STUDENT_SCHOOL_UPDATE:
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
