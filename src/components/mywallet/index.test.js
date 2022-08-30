import configureStore from "redux-mock-store"; //ES6 modules
import MyWallet from "./";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { i18n } from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { act } from "react-dom/test-utils";

const middlewares = [];
const mockStore = configureStore(middlewares);

it("test wallet components", async () => {
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

  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key) => key,
      i18n: { changeLanguage: jest.fn() },
    }),
  }));

  await act(async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router>
            <MyWallet />
          </Router>
        </Provider>
      </I18nextProvider>
    );
  });

  expect(screen.getByText("1.4")).toBeInTheDocument();
  expect(screen.getByText("0.1")).toBeInTheDocument();
});
