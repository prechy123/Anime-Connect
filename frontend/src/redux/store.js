import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";

export const store = configureStore({
  reducer: authReducer,
});
