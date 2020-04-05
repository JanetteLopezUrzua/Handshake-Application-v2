import {
  STUDENTS_LIST_LOADED,
  STUDENTS_LIST_ERROR,
  DELETE_ERRORS
} from "../actions/types";

const initialState = {
  students: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case STUDENTS_LIST_LOADED:
      return {
        ...state,
        students: payload,
        payload: null
      };

    // case STUDENT_BASIC_INFO_UPDATE:
    //   return {
    //     ...state,
    //     students: payload,
    //     payload: null
    //   };

    case STUDENTS_LIST_ERROR:
      return {
        ...state,
        payload
      };

    case DELETE_ERRORS:
      return {
        ...state,
        payload: null
      };

    default:
      return state;
  }
}
