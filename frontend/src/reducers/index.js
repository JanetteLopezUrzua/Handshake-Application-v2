import { combineReducers } from "redux";
import signup from "./signup";
import login from "./login";
import userprofile from "./userprofile";
import studentslist from "./studentslist";
import currentuser from "./currentuser";
import event from "./event";
import eventslist from "./eventslist";
import registeredeventslist from "./registeredeventslist";
import upcomingeventslist from "./upcomingeventslist";
import rsvplist from "./rsvplist";
import job from "./job";
import jobslist from "./jobslist";

export default combineReducers({
  signup,
  login,
  userprofile,
  currentuser,
  studentslist,
  event,
  eventslist,
  registeredeventslist,
  upcomingeventslist,
  rsvplist,
  job,
  jobslist,
});
