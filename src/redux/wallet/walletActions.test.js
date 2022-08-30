import configureStore from "redux-mock-store"; //ES6 modules

const middlewares = [];
const mockStore = configureStore(middlewares);

// You would import the action from your codebase in a real scenario
const addTodo = () => ({
  type: "GET_WALLET_BALANCE",
  payload: {
    eth: 1.324,
    weth: 0.12,
  },
});

test("should dispatch get wallet balance action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(addTodo());

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "GET_WALLET_BALANCE",
    payload: {
      eth: 1.324,
      weth: 0.12,
    },
  };
  expect(actions).toEqual([expectedPayload]);
});
