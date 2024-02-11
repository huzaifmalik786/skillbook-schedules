import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// slices

import scheduleReducer from "./slices/schedule";
import timezoneReducer from "./slices/timezone";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: ["data"],
};

const rootReducer = combineReducers({
  schedule: scheduleReducer,
  timezone: persistReducer(rootPersistConfig, timezoneReducer),
});

export { rootReducer, rootPersistConfig };
