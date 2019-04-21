import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./index.scss"

import rootReducer from "./reducers";
import App from "./containers/App";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById("root")
);
