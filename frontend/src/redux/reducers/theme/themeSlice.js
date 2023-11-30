import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

export const themeSlice = createSlice({
  name: "thememode",
  initialState,
  reducers: {
    isLight: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    isDark: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = themeSlice.actions;
export default themeSlice.reducer;
