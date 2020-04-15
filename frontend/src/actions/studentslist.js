import axios from "axios";
import { STUDENTS_LIST_LOADED, STUDENTS_LIST_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";

// Students List
export const loadstudentslist = (page, nameorcollege, major) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/studentslist?page=${page}&nameorcollege=${nameorcollege}&major=${major}`
    );
    dispatch({
      type: STUDENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: STUDENTS_LIST_ERROR,
      payload: errors,
    });
  }
};

export const companyloadstudentslist = (page, nameorcollegeorskillset) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/studentslist/company?page=${page}&nameorcollegeorskillset=${nameorcollegeorskillset}`
    );
    dispatch({
      type: STUDENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: STUDENTS_LIST_ERROR,
      payload: errors,
    });
  }
};
