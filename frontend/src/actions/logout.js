import { LOG_OUT } from "./types";

// Log Out
export const logout = () => async dispatch => {
  dispatch({
    type: LOG_OUT
  });
};
