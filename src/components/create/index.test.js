import configureStore from "redux-mock-store"; //ES6 modules
import Create from "./";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { i18n } from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { act } from "react-dom/test-utils";

const middlewares = [];
const mockStore = configureStore(middlewares);

it("test buy component", async () => {
  // Initialize mockstore with empty state
  const initialState = {};
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
            <Create />
          </Router>
        </Provider>
      </I18nextProvider>
    );
  });

  expect(screen.getByText("metamask")).toBeInTheDocument();
  expect(screen.getByText("go_back")).toBeInTheDocument();
});
