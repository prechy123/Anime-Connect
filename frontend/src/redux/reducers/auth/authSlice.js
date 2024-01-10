import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: "",
  fullname: "",
  profilePictureUrl: "",
  username: "",
  postcount: 0,
  followers: 0,
  following: 0,
  location: "",
  bio: "",
  animeInterest: [],
  verified: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuth: (state, action) => {
      const {
        isAuthenticated,
        email,
        fullname,
        profilePictureUrl,
        username,
        postcount,
        followers,
        following,
        location,
        bio,
        animeInterest,
        verified,
      } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
      state.fullname = fullname;
      state.profilePictureUrl = profilePictureUrl;
      state.username = username;
      state.postcount = postcount;
      state.followers = followers.length;
      state.following = following.length;
      state.location = location;
      state.bio = bio;
      state.animeInterest = animeInterest;
      state.verified = verified
    },
    notAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { isAuth, notAuth } = authSlice.actions;
export default authSlice.reducer;
