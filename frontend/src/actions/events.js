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
  EVENT_INFO_UPDATE,
  RSVP_LIST_LOADED,
  RSVP_LIST_ERROR,
  REGISTERED_EVENTS_LIST_LOADED,
  UPCOMING_EVENTS_LIST_LOADED,
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
    const { errors } = err.response.data;

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
    const photo = await axios.post(
      "http://localhost:3001/upload",
      event.bannerphoto
    );
    bannerphoto = photo.data;
  }

  const {
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
    const { errors } = err.response.data;

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
      `http://localhost:3001/companies/eventslist?page=${page}&id=${id}`
    );
    dispatch({
      type: EVENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
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
    const { errors } = err.response.data;

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
    const { errors } = err.response.data;

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
    const { errors } = err.response.data;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updateeventinfo = (event_id, event) => async (dispatch) => {
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
    eligibility,
  } = event;

  const body = JSON.stringify({
    event_id,
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
    eligibility,
  });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/event/info",
      body,
      config
    );

    dispatch({
      type: EVENT_INFO_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const companydeleteevent = (eventid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/companies/event/${eventid}`
    );

    dispatch({
      type: COMPANY_EVENT_DELETE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// RSVP
export const companyloadrsvplist = (eventid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/companies/event/${eventid}/rsvp`
    );
    dispatch({
      type: RSVP_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: RSVP_LIST_ERROR,
      payload: errors,
    });
  }
};

export const company_event_rsvp = (eventid, studentid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ eventid, studentid });

  console.log(body);

  try {
    await axios.put("http://localhost:3001/companies/event/rsvp", body, config);
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const company_event_unregister = (eventid, studentid) => async (
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

  const body = JSON.stringify({ eventid, studentid });

  console.log(body);

  try {
    await axios.put(
      "http://localhost:3001/companies/event/unregister",
      body,
      config
    );
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

// Student events
export const studentloadeventslist = (page, name) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/eventslist?page=${page}&name=${name}`
    );
    dispatch({
      type: EVENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const studentloadregisteredeventslist = (page, id) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/registered/eventslist?page=${page}&id=${id}`
    );
    dispatch({
      type: REGISTERED_EVENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const studentloadupcomingeventslist = (page, id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/upcoming/eventslist?page=${page}&id=${id}`
    );
    dispatch({
      type: UPCOMING_EVENTS_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const { errors } = err.response.data;
    dispatch({
      type: EVENT_UPDATE_ERROR,
      payload: errors,
    });
  }
};
