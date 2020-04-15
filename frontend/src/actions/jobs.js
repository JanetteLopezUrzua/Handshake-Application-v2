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
  APPLICATION_UPDATE_ERROR,
  APPLICATION_LOADED,
  RESET,
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
    const { errors } = err.response.data;

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
    const { errors } = err.response.data;

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
    const { errors } = err.response.data;
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

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
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
    const { errors } = err.response.data;

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
    const { errors } = err.response.data;

    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// Applications
export const company_update_application_status = (appid, status) => async (
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

  const body = JSON.stringify({ appid, status });

  console.log(body);

  try {
    await axios.put("http://localhost:3001/companies/job/status", body, config);
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: APPLICATION_UPDATE_ERROR,
      payload: errors,
    });
  }
};

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
    const { errors } = err.response.data;
    dispatch({
      type: APPLICATION_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const uploadresume = (
  job_id,
  student_id,
  data,
  status,
  month,
  day,
  year
) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let resume = await axios.post("http://localhost:3001/upload", data);
    resume = resume.data;

    const body = JSON.stringify({
      job_id,
      student_id,
      resume,
      status,
      month,
      day,
      year,
    });

    const res = await axios.put(
      "http://localhost:3001/students/job/application",
      body,
      config
    );

    dispatch({
      type: APPLICATION_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: APPLICATION_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const studentloadapplications = (page, filter, id) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/applicationslist?page=${page}&filter=${filter}&id=${id}`
    );
    dispatch({
      type: APPLICATIONS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: APPLICATION_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// Student job postings
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
    const { errors } = err.response.data;
    dispatch({
      type: JOB_UPDATE_ERROR,
      payload: errors,
    });
  }
};
