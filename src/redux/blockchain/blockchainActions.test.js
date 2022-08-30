import configureStore from "redux-mock-store"; //ES6 modules

const middlewares = [];
const mockStore = configureStore(middlewares);

// You would import the action from your codebase in a real scenario
const addTodo = () => ({ type: "CONNECTION_REQUEST" });

test("should dispatch connection request action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(addTodo());

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = { type: "CONNECTION_REQUEST" };
  expect(actions).toEqual([expectedPayload]);
});

test("should dispatch connection success action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch({
    type: "CONNECTION_SUCCESS",
    payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
  });

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "CONNECTION_SUCCESS",
    payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
  };
  expect(actions).toEqual([expectedPayload]);
});

test("should dispatch connection failed action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch({
    type: "CONNECTION_FAILED",
  });

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "CONNECTION_FAILED",
  };
  expect(actions).toEqual([expectedPayload]);
});

test("should dispatch update account action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch({
    type: "UPDATE_ACCOUNT",
    payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
  });

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "UPDATE_ACCOUNT",
    payload: { account: "0xD46a50fbdf85A341B432C76E3FF9F0A67b8390BB" },
  };
  expect(actions).toEqual([expectedPayload]);
});
