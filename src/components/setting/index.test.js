import configureStore from "redux-mock-store"; //ES6 modules
import Setting from "./";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { i18n } from "../../i18n";
import { I18nextProvider } from "react-i18next";
import axios from "axios";

jest.mock("axios");
const middlewares = [];
const mockStore = configureStore(middlewares);

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders store state", () => {
  // Initialize mockstore with empty state
  const initialState = {
    authentication: {
      account: "0xFc39B7eEC05544f04c8601A64ad3890C6B9Ee060",
    },
    wallet: {
      eth: 1.4,
      weth: 0.1,
    },
  };
  const store = mockStore(initialState);

  const data = {
    itemSold: false,
    bidActivity: false,
    priceChange: false,
    auctionExpiration: false,
    outBid: false,
    ownedItemUpdateds: false,
    successfulPurchase: false,
    infiniNewsletter: false,
  };

  axios.get.mockImplementationOnce(() => Promise.resolve(data));

  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Router>
          <Setting />
        </Router>
      </Provider>
    </I18nextProvider>,
    container
  );

  expect(
    container.querySelector("[name='itemSold']").getAttribute("checked")
  ).toEqual(null);
});
