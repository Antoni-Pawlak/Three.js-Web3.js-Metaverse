import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authenticationReducer from "./authentication/authenticationReducer";
import roomReducer from "./room/roomReducers";
import selectedNFTReducer from "./selectedNFT/selectedNFTReducers";
import walletReducer from "./wallet/walletReducers";
import setAuthToken from "../utils/setAuthToken";
import blockchainReducer from "./blockchain/blockchainReducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  room: roomReducer,
  selectedNFT: selectedNFTReducer,
  wallet: walletReducer,
  blockchain: blockchainReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (
    previousState.authentication.account !== currentState.authentication.account
  ) {
    const token = currentState.authentication.account;
    setAuthToken(token);
  }
});

export default store;
