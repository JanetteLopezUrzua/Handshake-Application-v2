import axios from "axios";
import {
  COMPANY_ADD_NEW_JOB,
  DELETE_ERRORS,
  COMPANY_JOB_DELETE,
  JOB_LOADED,
  JOB_UPDATE_ERROR,
  JOBS_LIST_LOADED,
  JOB_INFO_UPDATE,
  APPLICATIONS_LIST_LOADED,
  APPLICATIONS_LIST_ERROR,
  APPLIED_JOBS_LIST_LOADED,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Jobs
export const companyloadjob = (jobid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3001/companies/job/${jobid}`);
    dispatch({
      type: JOB_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const addnewjob = ({ company_id, job }) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let {
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
    postingmonth,
    postingday,
    postingyear,
  } = job;

  const body = JSON.stringify({
    company_id,
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
    postingmonth,
    postingday,
    postingyear,
  });

  console.log(body);

  try {
    const res = await axios.post(
      "http://localhost:3001/companies/newjobposting",
      body,
      config
    );

    dispatch({
      type: COMPANY_ADD_NEW_JOB,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// Jobs List
export const companyloadjobslist = (page, id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/companies/jobslist?page=${page}&id=${id}`
    );
    dispatch({
      type: JOBS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const deleteerrors = () => (dispatch) => {
  dispatch({
    type: DELETE_ERRORS,
  });
};

export const updatejobinfo = (job_id, job) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const {
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
  } = job;

  const body = JSON.stringify({
    job_id,
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
  });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/job/info",
      body,
      config
    );

    dispatch({
      type: JOB_INFO_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const companydeletejob = (jobid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/companies/job/${jobid}`
    );

    dispatch({
      type: COMPANY_JOB_DELETE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// Applications
export const companyloadapplicationslist = (jobid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/companies/job/${jobid}/applications`
    );
    dispatch({
      type: APPLICATIONS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: APPLICATIONS_LIST_ERROR,
      payload: errors,
    });
  }
};

// export const company_event_rsvp = (eventid, studentid) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ eventid, studentid });

//   console.log(body);

//   try {
//     const res = await axios.put(
//       "http://localhost:3001/companies/event/rsvp",
//       body,
//       config
//     );
//   } catch (err) {
//     console.log("ERR", err);
//     const errors = err.response.data.errors;

//     dispatch({
//       type: EVENT_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };

// export const company_event_unregister = (eventid, studentid) => async (
//   dispatch
// ) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ eventid, studentid });

//   console.log(body);

//   try {
//     const res = await axios.put(
//       "http://localhost:3001/companies/event/unregister",
//       body,
//       config
//     );
//   } catch (err) {
//     console.log("ERR", err);
//     const errors = err.response.data.errors;

//     dispatch({
//       type: EVENT_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };

// Student events
export const studentloadjobslist = (
  page,
  nameortitle,
  location,
  filter,
  sort
) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/jobslist?page=${page}&nameortitle=${nameortitle}&location=${location}&filter=${filter}&sort=${sort}`
    );
    dispatch({
      type: JOBS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// export const studentloadregisteredeventslist = (page, id) => async (
//   dispatch
// ) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get(
//       `http://localhost:3001/students/registered/eventslist?page=${page}&id=${id}`
//     );
//     dispatch({
//       type: REGISTERED_EVENTS_LIST_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     dispatch({
//       type: EVENT_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };

// export const studentloadupcomingeventslist = (page, id) => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get(
//       `http://localhost:3001/students/upcoming/eventslist?page=${page}&id=${id}`
//     );
//     dispatch({
//       type: UPCOMING_EVENTS_LIST_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;
//     dispatch({
//       type: EVENT_UPDATE_ERROR,
//       payload: errors,
//     });
//   }
// };
