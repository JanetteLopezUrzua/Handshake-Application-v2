import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOG_OUT } from "../actions/types";
const jwt_decode = require("jwt-decode");

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem("token", payload);
      var decoded = jwt_decode(payload.split(" ")[1]);
      localStorage.setItem("id", decoded.user.id);
      localStorage.setItem("type", decoded.user.type);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case SIGNUP_FAIL:
    case LOG_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("type");
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
