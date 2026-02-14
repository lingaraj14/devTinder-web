import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import connectionRequestedReducer from "./connectionRequestSlice";
//import authReducer from "./authSlice";

const appReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  connection: connectionReducer,
  connectionRequest: connectionRequestedReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined; // 🔥 clears entire store
  }
  return appReducer(state, action);
};

const appStore = configureStore({
  reducer: {
    appReducer: rootReducer,
  },
});

export default appStore;
