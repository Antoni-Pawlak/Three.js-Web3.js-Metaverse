import setAuthToken from "../../utils/setAuthToken";

export const connectRequest = () => async (dispatch) => {
  dispatch({
    type: "CONNECTION_REQUEST",
  });
};

export const connectSuccess = (payload) => async (dispatch) => {
  dispatch({
    type: "CONNECTION_SUCCESS",
    payload: payload,
  });
};

export const connectFailed = (payload) => async (dispatch) => {
  setAuthToken();
  dispatch({
    type: "CONNECTION_FAILED",
    payload: payload,
  });
};

export const updateAccountRequest = (payload) => async (dispatch) => {
  dispatch({
    type: "UPDATE_ACCOUNT",
    payload: payload,
  });
};

export const disconnectRequest = () => async (dispatch) => {
  setAuthToken();
  dispatch({
    type: "DISCONNECTION_REQUEST",
  });
};
