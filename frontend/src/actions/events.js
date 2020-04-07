import axios from "axios";
import {
  COMPANY_ADD_NEW_EVENT,
  DELETE_ERRORS,
  COMPANY_EVENT_DELETE,
  EVENT_LOADED,
  EVENT_UPDATE_ERROR,
  EVENTS_LIST_LOADED,
  EVENT_DESCRIPTION_UPDATE,
  EVENT_BANNER_PHOTO_UPDATE,
  EVENT_BANNER_PHOTO_DELETE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Events
export const companyloadevent = (eventid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/companies/event/${eventid}`
    );
    dispatch({
      type: EVENT_LOADED,
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

// Events List
export const companyloadeventslist = (page, id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/companies/eventslist?page=${page}&&id=${id}`
    );
    dispatch({
      type: EVENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updatebannerphoto = (eventid, data) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let photo = await axios.post("http://localhost:3001/upload", data);
    photo = photo.data;
    const body = JSON.stringify({ eventid, photo });

    console.log(body);

    const res = await axios.put(
      "http://localhost:3001/companies/event/bannerphoto",
      body,
      config
    );

    dispatch({
      type: EVENT_BANNER_PHOTO_UPDATE,
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

export const deletebannerphoto = (eventid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/companies/event/bannerphoto/${eventid}`
    );

    dispatch({
      type: EVENT_BANNER_PHOTO_DELETE,
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

export const deleteerrors = () => (dispatch) => {
  dispatch({
    type: DELETE_ERRORS,
  });
};

export const updateeventdescription = (event_id, description) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ event_id, description });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/event/description",
      body,
      config
    );

    dispatch({
      type: EVENT_DESCRIPTION_UPDATE,
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
