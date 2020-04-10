import {
  RSVP_LIST_LOADED,
  RSVP_LIST_ERROR,
  DELETE_ERRORS,
  LOG_OUT,
} from "../actions/types";

const initialState = {
  students: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case RSVP_LIST_LOADED:
      return {
        ...state,
        students: payload,
        payload: null,
      };

    case RSVP_LIST_ERROR:
      return {
        ...state,
        payload,
      };

    case LOG_OUT:
    case DELETE_ERRORS:
      return {
        ...state,
        payload: null,
      };

    default:
      return state;
  }
}
