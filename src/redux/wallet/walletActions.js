export const getWalletBalance = (payload) => async (dispatch) => {
  dispatch({
    type: "GET_WALLET_BALANCE",
    payload: payload,
  });
};
