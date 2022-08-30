import selectedNFTReducer from "./selectedNFTReducers";

test("should return the initial state", () => {
  expect(selectedNFTReducer(undefined, {})).toEqual({
    no: -1,
  });
});

test("should return the select nft state", () => {
  expect(
    selectedNFTReducer(undefined, {
      type: "SELECT_NFT",
      payload: {
        no: 3,
      },
    })
  ).toEqual({
    no: 3,
  });
});

test("should return the select none nft state", () => {
  expect(
    selectedNFTReducer(undefined, {
      type: "SELECT_NONE_NFT",
    })
  ).toEqual({
    no: -1,
  });
});
