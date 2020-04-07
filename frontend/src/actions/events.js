import axios from "axios";
import {
  COMPANY_ADD_NEW_EVENT,
  COMPANY_EVENT_DELETE,
  COMPANY_EVENT_UPDATE,
  EVENT_UPDATE_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Events
export const addnewevent = ({ company_id, event }) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let bannerphoto = "";
  if (event.bannerphoto !== "") {
    let photo = await axios.post(
      "http://localhost:3001/upload",
      event.bannerphoto
    );
    bannerphoto = photo.data;
  }

  let {
    title,
    dayofweek,
    month,
    day,
    year,
    starttime,
    startdaytime,
    endtime,
    enddaytime,
    timezone,
    location,
    eligibilityoption,
    eligibility,
    description,
  } = event;

  const body = JSON.stringify({
    company_id,
    bannerphoto,
    title,
    dayofweek,
    month,
    day,
    year,
    starttime,
    startdaytime,
    endtime,
    enddaytime,
    timezone,
    location,
    eligibilityoption,
    eligibility,
    description,
  });

  console.log(body);

  try {
    const res = await axios.post(
      "http://localhost:3001/companies/newevent",
      body,
      config
    );

    dispatch({
      type: COMPANY_ADD_NEW_EVENT,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// export const deleteschool = (id, schoolid) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.delete(
//       `http://localhost:3001/students/school/${id}/${schoolid}`
//     );

//     dispatch({
//       type: STUDENT_SCHOOL_DELETE,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log("ERR", err);
//     const errors = err.response.data.errors;

//     dispatch({
//       type: USER_PROFILE_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };

// export const updateevent = (id, school, schoolid) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   let { location, degree, major, passingmonth, passingyear, gpa } = school;

//   const body = JSON.stringify({
//     id,
//     schoolid,
//     location,
//     degree,
//     major,
//     passingmonth,
//     passingyear,
//     gpa,
//   });

//   console.log(body);

//   try {
//     const res = await axios.put(
//       "http://localhost:3001/students/school",
//       body,
//       config
//     );

//     dispatch({
//       type: STUDENT_SCHOOL_UPDATE,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log("ERR", err);
//     const errors = err.response.data.errors;

//     dispatch({
//       type: USER_PROFILE_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };
