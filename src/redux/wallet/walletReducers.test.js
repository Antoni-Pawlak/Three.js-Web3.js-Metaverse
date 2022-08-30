import walletReducer from "./walletReducers";

test("should return the initial state", () => {
  expect(walletReducer(undefined, {})).toEqual({
    eth: 0,
    weth: 0,
  });
});

test("should return the get wallet balance state", () => {
  expect(
    walletReducer(undefined, {
      type: "GET_WALLET_BALANCE",
      payload: {
        eth: 1,
        weth: 0.4,
      },
    })
  ).toEqual({
    eth: 1,
    weth: 0.4,
  });
});
