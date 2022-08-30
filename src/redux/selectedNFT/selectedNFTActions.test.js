import configureStore from "redux-mock-store"; //ES6 modules

const middlewares = [];
const mockStore = configureStore(middlewares);

// You would import the action from your codebase in a real scenario
const addTodo = () => ({
  type: "SELECT_NFT",
  payload: {
    no: 1,
    name: "/nft/1.png",
  },
});

test("should dispatch select nft action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(addTodo());

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "SELECT_NFT",
    payload: {
      no: 1,
      name: "/nft/1.png",
    },
  };
  expect(actions).toEqual([expectedPayload]);
});

test("should dispatch select none nft action", () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch({ type: "SELECT_NONE_NFT" });

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = {
    type: "SELECT_NONE_NFT",
  };
  expect(actions).toEqual([expectedPayload]);
});
