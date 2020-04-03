import axios from "axios";
import {
  USER_PROFILE_LOADED,
  STUDENT_BASIC_INFO_UPDATE,
  STUDENT_CAREER_OBJECTIVE_UPDATE,
  USER_PROFILE_UPDATE_ERROR,
  AUTH_ERROR,
  STUDENT_PHOTO_UPDATE,
  STUDENT_PHOTO_DELETE,
  STUDENT_CONTACT_INFO_UPDATE,
  STUDENT_SKILLSET_UPDATE,
  STUDENT_SKILL_DELETE,
  STUDENT_ADD_NEW_SCHOOL,
  STUDENT_SCHOOL_DELETE,
  STUDENT_SCHOOL_UPDATE,
  STUDENT_ADD_NEW_JOB,
  STUDENT_JOB_DELETE,
  STUDENT_JOB_UPDATE,
  DELETE_ERRORS
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

export const updatebasicinfo = ({
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
      "http://localhost:3001/students/basicinfo",
      body,
      config
    );

    dispatch({
      type: STUDENT_BASIC_INFO_UPDATE,
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

export const updatecareerobjective = ({ id, objective }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, objective });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/careerobjective",
      body,
      config
    );

    dispatch({
      type: STUDENT_CAREER_OBJECTIVE_UPDATE,
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

export const updatephoto = ({ id, data }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    let photo = await axios.post("http://localhost:3001/upload", data);
    photo = photo.data;
    const body = JSON.stringify({ id, photo });

    console.log(body);

    const res = await axios.put(
      "http://localhost:3001/students/photo",
      body,
      config
    );

    dispatch({
      type: STUDENT_PHOTO_UPDATE,
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

export const deletephoto = id => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/students/photo/${id}`
    );

    dispatch({
      type: STUDENT_PHOTO_DELETE,
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

export const updatecontactinfo = ({
  id,
  email,
  phonenumber
}) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, email, phonenumber });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/contactinfo",
      body,
      config
    );

    dispatch({
      type: STUDENT_CONTACT_INFO_UPDATE,
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

export const updateskills = ({ id, skill }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id, skill });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/skillset",
      body,
      config
    );

    dispatch({
      type: STUDENT_SKILLSET_UPDATE,
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

export const deleteskill = (id, skill) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/students/skill/${id}/${skill}`
    );

    dispatch({
      type: STUDENT_SKILL_DELETE,
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

export const addnewschool = ({ id, school }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let {
    name,
    primaryschool,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  } = school;

  const body = JSON.stringify({
    id,
    name,
    primaryschool,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  });

  console.log(body);

  try {
    const res = await axios.post(
      "http://localhost:3001/students/newschool",
      body,
      config
    );

    dispatch({
      type: STUDENT_ADD_NEW_SCHOOL,
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

export const deleteschool = (id, schoolid) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/students/school/${id}/${schoolid}`
    );

    dispatch({
      type: STUDENT_SCHOOL_DELETE,
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

export const updateschool = (id, school, schoolid) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let { location, degree, major, passingmonth, passingyear, gpa } = school;

  const body = JSON.stringify({
    id,
    schoolid,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/school",
      body,
      config
    );

    dispatch({
      type: STUDENT_SCHOOL_UPDATE,
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

export const addnewjob = ({ id, job }) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let {
    companyname,
    title,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  } = job;

  const body = JSON.stringify({
    id,
    companyname,
    title,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  });

  console.log(body);

  try {
    const res = await axios.post(
      "http://localhost:3001/students/newjob",
      body,
      config
    );

    dispatch({
      type: STUDENT_ADD_NEW_JOB,
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

export const deletejob = (id, jobid) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/students/job/${id}/${jobid}`
    );

    dispatch({
      type: STUDENT_JOB_DELETE,
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

export const updatejob = (id, job, jobid) => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  let {
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  } = job;

  const body = JSON.stringify({
    id,
    jobid,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/students/job",
      body,
      config
    );

    dispatch({
      type: STUDENT_JOB_UPDATE,
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

export const deleteerrors = () => dispatch => {
  dispatch({
    type: DELETE_ERRORS
  });
};
