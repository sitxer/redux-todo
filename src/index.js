import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.scss";

import configureStore from "./config/configureStore";
import App from "./containers/App";

const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssBaseline />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root"),
);
