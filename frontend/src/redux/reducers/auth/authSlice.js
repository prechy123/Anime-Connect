import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
  fullname: "",
  profilePictureUrl: "",
  username: "",
  postcount: 0,
  followers: 0,
  following: 0
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      const { isAuthenticated, email, fullname, profilePictureUrl, username, postcount, followers, following } =
        action.payload;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
      state.fullname = fullname;
      state.profilePictureUrl = profilePictureUrl;
      state.username = username;
      state.postcount = postcount;
      state.followers = followers.length;
      state.following = following.length;
    },
    notAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = authSlice.actions;
export default authSlice.reducer;
