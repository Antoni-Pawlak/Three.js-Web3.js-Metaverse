const initialState = {
  loading: false,
  account: null,
  isLogin: false,
  signature: false,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        isLogin: true,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
      };
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "DISCONNECTION_REQUEST":
      return {
        ...initialState,
        isLogin: false,
        signature: false,
      };
    case "SIGNATURE_SUCCESS":
      return {
        ...state,
        signature: true,
      };
    case "SIGNATURE_FAILED":
      return {
        ...state,
        signature: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
