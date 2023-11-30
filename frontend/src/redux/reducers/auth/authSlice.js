import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    notAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = authSlice.actions;
export default authSlice.reducer;
