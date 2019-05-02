import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import moment from "moment";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
};

const meta = {
  date: {},
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setDateLog = store => next => action => {
  action.meta = meta;
  action.meta.date = moment().format("YYYY-MM-DD HH:mm:ss");
  let result = next(action);
  return result;
};

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(setDateLog));
  let persistor = persistStore(store);
  return { store, persistor };
};
