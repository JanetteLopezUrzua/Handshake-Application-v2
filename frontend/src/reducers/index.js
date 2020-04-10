import { combineReducers } from "redux";
import signup from "./signup";
import login from "./login";
import userprofile from "./userprofile";
import studentslist from "./studentslist";
import currentuser from "./currentuser";
import event from "./event";
import eventslist from "./eventslist";
import rsvplist from "./rsvplist";

export default combineReducers({
  signup,
  login,
  userprofile,
  currentuser,
  studentslist,
  event,
  eventslist,
  rsvplist,
});
