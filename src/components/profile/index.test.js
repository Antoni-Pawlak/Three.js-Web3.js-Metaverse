import configureStore from "redux-mock-store"; //ES6 modules
import Profile from "./";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { i18n } from "../../i18n";
import { I18nextProvider } from "react-i18next";

const middlewares = [];
const mockStore = configureStore(middlewares);

it("test profile component", async () => {
  // Initialize mockstore with empty state
  const initialState = {
    authentication: {
      account: "0xFc39B7eEC05544f04c8601A64ad3890C6B9Ee060",
    },
  };
  const store = mockStore(initialState);

  jest.mock("react-i18next", () => ({
    useTranslation: () => ({
      t: (key) => key,
      i18n: { changeLanguage: jest.fn() },
    }),
  }));
});
