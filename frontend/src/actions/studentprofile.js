import axios from "axios";
import {
  USER_PROFILE_LOADED,
  USER_PROFILE_UPDATE,
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

export const updatestudentprofile = ({
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
      "http://localhost:3001/students/info",
      body,
      config
    );

    dispatch({
      type: USER_PROFILE_UPDATE,
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
