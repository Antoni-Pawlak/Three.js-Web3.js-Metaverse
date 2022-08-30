import authenticationReducer from "./authenticationReducer";

test("should return the initial state", () => {
  expect(authenticationReducer(undefined, {})).toEqual({
    loading: false,
    account: null,
    isLogin: false,
    signature: false,
  });
});

test("should return the connection success state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "CONNECTION_SUCCESS",
      payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
    })
  ).toEqual({
    loading: false,
    account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB",
    isLogin: true,
    signature: false,
  });
});

test("should return the connection failed state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "CONNECTION_FAILED",
    })
  ).toEqual({
    loading: false,
    account: null,
    isLogin: false,
    signature: false,
  });
});

test("should return the update account state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "UPDATE_ACCOUNT",
      payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
    })
  ).toEqual({
    loading: false,
    account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB",
    isLogin: false,
    signature: false,
  });
});

test("should return the disconnection request state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "DISCONNECTION_REQUEST",
    })
  ).toEqual({
    loading: false,
    account: null,
    isLogin: false,
    signature: false,
  });
});

test("should return the signature success state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "SIGNATURE_SUCCESS",
    })
  ).toEqual({
    loading: false,
    account: null,
    isLogin: false,
    signature: true,
  });
});

test("should return the signature failed state", () => {
  expect(
    authenticationReducer(undefined, {
      type: "SIGNATURE_FAILED",
    })
  ).toEqual({
    loading: false,
    account: null,
    isLogin: false,
    signature: false,
  });
});
