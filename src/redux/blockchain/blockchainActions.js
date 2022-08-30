// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import SmartContract from "../../contracts/InfiniSpaceNFT.json";
import { Constants } from "../../constants/Constants";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

const connectContractSuccess = (payload) => {
  return {
    type: "CONNECTION_CONTRACT_SUCCESS",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });

        if (networkId === "4") {
          // IMPORTANT. ONCE YOUR CONTRACT IS ON THE MAIN NET, SWITCH THIS NUMBER TO 1.
          const SmartContractObj = new Web3EthContract(
            SmartContract,
            "0xc2612908b76e4fda76391cb87288e549259cfaf8" // **IMPORTANT** PASTE CONTRACT ADDRESS HERE
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Ethereum."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Please install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
  };
};

export const connectAlchemy = () => {
  return async (dispatch) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://eth-rinkeby.alchemyapi.io/v2/${Constants.ALCHEMY_KEY}`
      )
    );
    const smartContract = await new web3.eth.Contract(
      SmartContract,
      Constants.NFT_CONTRACT_ADDRESS
    );

    dispatch(
      connectContractSuccess({
        smartContract: smartContract,
        web3Alchemy: web3,
      })
    );
  };
};
