import axios from "axios";
import {
  USER_PROFILE_LOADED,
  AUTH_ERROR,
  COMPANY_BASIC_INFO_UPDATE,
  COMPANY_USER_PROFILE_UPDATE_ERROR,
  COMPANY_CONTACT_INFO_UPDATE,
  COMPANY_PHOTO_UPDATE,
  COMPANY_PHOTO_DELETE,
  COMPANY_NAME_UPDATE,
  DELETE_ERRORS,
  CURRENT_USER_PROFILE_LOADED,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Company Profile
export const loadcompanyprofile = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3001/companies/info/${id}`);
    dispatch({
      type: USER_PROFILE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const loadcurrentcompany = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:3001/companies/info/${id}`);
    dispatch({
      type: CURRENT_USER_PROFILE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log("ERR", error);
    const { errors } = error.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updatebasicinfo = ({ id, location, description }) => async (
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

  const body = JSON.stringify({ id, location, description });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/basicinfo",
      body,
      config
    );

    dispatch({
      type: COMPANY_BASIC_INFO_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updatecontactinfo = ({ id, email, phonenumber }) => async (
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

  const body = JSON.stringify({ id, email, phonenumber });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/contactinfo",
      body,
      config
    );

    dispatch({
      type: COMPANY_CONTACT_INFO_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updatephoto = ({ id, data }) => async (dispatch) => {
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
    const body = JSON.stringify({ id, photo });

    console.log(body);

    const res = await axios.put(
      "http://localhost:3001/companies/photo",
      body,
      config
    );

    dispatch({
      type: COMPANY_PHOTO_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const deletephoto = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.delete(
      `http://localhost:3001/companies/photo/${id}`
    );

    dispatch({
      type: COMPANY_PHOTO_DELETE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const updatecompanyname = ({ id, name }) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ id, name });

  console.log(body);

  try {
    const res = await axios.put(
      "http://localhost:3001/companies/name",
      body,
      config
    );

    dispatch({
      type: COMPANY_NAME_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const { errors } = err.response.data;

    dispatch({
      type: COMPANY_USER_PROFILE_UPDATE_ERROR,
      payload: errors,
    });
  }
};

export const deleteerrors = () => (dispatch) => {
  dispatch({
    type: DELETE_ERRORS,
  });
};
