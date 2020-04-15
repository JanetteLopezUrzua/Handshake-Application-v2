import axios from "axios";
import {
  ALL_MESSAGES_LOADED,
  MESSAGE_LOADED,
  DELETE_ERRORS,
  MESSAGE_ERROR,
  MESSAGES_LIST_LOADED,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Messages
export const deleteerrors = () => (dispatch) => {
  dispatch({
    type: DELETE_ERRORS,
  });
};

export const sendmessage = (
  from_type,
  from_id,
  to_id,
  message,
  read,
  message_month,
  message_day,
  message_year,
  message_hour,
  message_minute,
  message_day_time
) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    from_type,
    from_id,
    to_id,
    message,
    read,
    message_month,
    message_day,
    message_year,
    message_hour,
    message_minute,
    message_day_time,
  });

  console.log(body);

  try {
    const res = await axios.post(
      "http://localhost:3001/students/newmessage",
      body,
      config
    );

    dispatch({
      type: MESSAGE_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("ERR", err);
    const errors = err.response.data.errors;

    dispatch({
      type: MESSAGE_ERROR,
      payload: errors,
    });
  }
};

export const loadmessageslist = (type, toid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/messageslist?type=${type}&toid=${toid}`
    );
    dispatch({
      type: MESSAGES_LIST_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: MESSAGE_ERROR,
      payload: errors,
    });
  }
};

export const loadmessage = (fromid, currid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(
      `http://localhost:3001/students/messageinfo?fromid=${fromid}&currid=${currid}`
    );
    dispatch({
      type: ALL_MESSAGES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: MESSAGE_ERROR,
      payload: errors,
    });
  }
};
