import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authSlice";
import themeReducer from "./reducers/theme/themeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
});
