import axios from "axios";
import {
  USER_PROFILE_LOADED,
  STUDENT_BASIC_INFO_UPDATE,
  STUDENT_CAREER_OBJECTIVE_UPDATE,
  USER_PROFILE_UPDATE_ERROR,
  AUTH_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Student Profile
export const loadstudentprofile = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3001/students/info/${id}`);
    dispatch({
      type: USER_PROFILE_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const updatebasicinfo = ({
  id,
  fname,
  lname,
  dob,
  city,
  state,
  country
}) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, fname, lname, dob, city, state, country });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/basicinfo",
      body,
      config
    );

    dispatch({
      type: STUDENT_BASIC_INFO_UPDATE,
      payload: res.data
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: USER_PROFILE_UPDATE_ERROR,
      payload: errors
    });
  }
};

export const updatecareerobjective = ({ id, objective }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, objective });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/careerobjective",
      body,
      config
    );

    dispatch({
      type: STUDENT_CAREER_OBJECTIVE_UPDATE,
      payload: res.data
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: USER_PROFILE_UPDATE_ERROR,
      payload: errors
    });
  }
};
