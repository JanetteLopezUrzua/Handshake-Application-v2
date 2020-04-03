import axios from "axios";
import {
  USER_PROFILE_LOADED,
  AUTH_ERROR,
  COMPANY_BASIC_INFO_UPDATE,
  USER_PROFILE_UPDATE_ERROR
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Company Profile
export const loadcompanyprofile = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3001/companies/info/${id}`);
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
  location,
  description
}) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, location, description });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/basicinfo",
      body,
      config
    );

    dispatch({
      type: COMPANY_BASIC_INFO_UPDATE,
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
