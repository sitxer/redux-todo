import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import moment from "moment";

import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const setDateLog = store => next => action => {
  action.meta = {
    ...action.meta,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  let result = next(action);
  return result;
};

const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  const timeoutId = setTimeout(() => next(action), action.meta.delay);

  return function cancel() {
    clearTimeout(timeoutId);
  };
};

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(setDateLog, timeoutScheduler)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
