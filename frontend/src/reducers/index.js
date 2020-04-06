import { combineReducers } from "redux";
import signup from "./signup";
import login from "./login";
import userprofile from "./userprofile";
import studentslist from "./studentslist";
import currentuser from "./currentuser";

export default combineReducers({
  signup,
  login,
  userprofile,
  currentuser,
  studentslist,
});
