import { combineReducers } from "redux";
import signup from "./signup";
import login from "./login";

export default combineReducers({
  signup,
  login
});
