import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import {createLogger} from 'redux-logger'
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";
const logger = createLogger({})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(logger)
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
