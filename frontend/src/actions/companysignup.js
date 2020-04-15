import axios from "axios";
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";

// Company Sign Up
export const companysignup = ({
  name,
  email,
  password,
  location
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    name, email, password, location
  });

  console.log(body);

  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(
      "http://localhost:3001/companies/signup",
      body,
      config
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    const { errors } = err.response.data;

    dispatch({
      type: SIGNUP_FAIL,
      payload: errors
    });
  }
};
