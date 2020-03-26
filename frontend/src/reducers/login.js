import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";
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
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      var decoded = jwt_decode(payload.token);
      localStorage.setItem("id", decoded.student.id);
      localStorage.setItem("type", decoded.student.type);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case LOGIN_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        payload,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    }

    default:
      return state;
  }
}
