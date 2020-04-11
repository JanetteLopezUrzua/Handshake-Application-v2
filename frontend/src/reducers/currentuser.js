import {
  CURRENT_USER_PROFILE_LOADED,
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
  STUDENT_SCHOOL_UPDATE,
  STUDENT_ADD_NEW_JOB,
  STUDENT_JOB_DELETE,
  STUDENT_JOB_UPDATE,
  DELETE_ERRORS,
  LOG_OUT,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  COMPANY_BASIC_INFO_UPDATE,
  COMPANY_CONTACT_INFO_UPDATE,
  COMPANY_PHOTO_UPDATE,
  COMPANY_PHOTO_DELETE,
  COMPANY_NAME_UPDATE,
  COMPANY_USER_PROFILE_UPDATE_ERROR,
} from "../actions/types";

const initialState = {
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        user: null,
      };

    case CURRENT_USER_PROFILE_LOADED:
      return {
        ...state,
        user: payload,
      };

    case COMPANY_BASIC_INFO_UPDATE:
    case COMPANY_CONTACT_INFO_UPDATE:
    case COMPANY_PHOTO_UPDATE:
    case COMPANY_PHOTO_DELETE:
    case COMPANY_NAME_UPDATE:
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
    case STUDENT_ADD_NEW_JOB:
    case STUDENT_JOB_DELETE:
    case STUDENT_JOB_UPDATE:
      return {
        ...state,
        user: payload,
        payload: null,
      };

    case USER_PROFILE_UPDATE_ERROR:
    case COMPANY_USER_PROFILE_UPDATE_ERROR:
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
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        user: null,
      };

    default:
      return state;
  }
}
