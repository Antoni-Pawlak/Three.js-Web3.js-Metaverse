const initialState = {
  eth: 0,
  weth: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WALLET_BALANCE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default walletReducer;
