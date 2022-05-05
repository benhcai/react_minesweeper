import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import middleware from "./middleware";

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: true,
});

export default store;
