import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

// Student Sign Up
export const studentlogin = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  console.log(body);

  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      "http://localhost:3001/students/login",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
    const errors = err.response.data.errors;

    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};
