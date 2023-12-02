import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
  fullname: "",
  profilePictureUrl: "",
  username: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      const { isAuthenticated, email, fullname, profilePictureUrl, username } =
        action.payload;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
      state.fullname = fullname;
      state.profilePictureUrl = profilePictureUrl;
      state.username = username;
    },
    notAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = authSlice.actions;
export default authSlice.reducer;
