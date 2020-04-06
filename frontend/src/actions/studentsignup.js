import axios from "axios";
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";

// Student Sign Up
export const studentsignup = ({
  fname,
  lname,
  email,
  password,
  college
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ fname, lname, email, password, college });

  console.log(body);

  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      "http://localhost:3001/students/signup",
      body,
      config
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    dispatch({
      type: SIGNUP_FAIL,
      payload: errors
    });
  }
};
