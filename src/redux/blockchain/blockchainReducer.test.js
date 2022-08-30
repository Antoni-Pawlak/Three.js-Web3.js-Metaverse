import blockchainReducer from "./blockchainReducer";

test("should return the initial state", () => {
  expect(blockchainReducer(undefined, {})).toEqual({
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: "",
    web3Alchemy: null,
  });
});

test("should return the connection success state", () => {
  expect(
    blockchainReducer(undefined, {
      type: "CONNECTION_SUCCESS",
      payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
    })
  ).toEqual({
    loading: false,
    account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB",
    smartContract: undefined,
    web3: undefined,
    errorMsg: "",
    web3Alchemy: null,
  });
});

test("should return the connection failed state", () => {
  expect(
    blockchainReducer(undefined, {
      type: "CONNECTION_FAILED",
    })
  ).toEqual({
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: undefined,
    web3Alchemy: null,
  });
});

test("should return the update account state", () => {
  expect(
    blockchainReducer(undefined, {
      type: "UPDATE_ACCOUNT",
      payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
    })
  ).toEqual({
    loading: false,
    account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB",
    smartContract: null,
    web3: null,
    errorMsg: "",
    web3Alchemy: null,
  });
});
