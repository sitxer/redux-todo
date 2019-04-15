import { createStore } from "redux";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import rootReducer from "./reducers";
import App from "./containers/App";
import './index.scss';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
