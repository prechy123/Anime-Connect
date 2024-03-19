import { Box, Divider, Stack } from "@mui/material";
import LeftBar from "../Components/HomePage/LeftBar";
import SideBar from "../Components/HomePage/SideBar";
import ComingSoon from "../Components/ComingSoon/ComingSoon";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isAuth } from "../redux/reducers/auth/authSlice";

const Setting = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    if (Cookies.get("user")) {
      setUser(JSON.parse(Cookies.get("user")));
    }
  }, []);
  if (user) {
    dispatch(
      isAuth({
        isAuthenticated: true,
        email: user.email,
        fullname: user.fullname,
        profilePictureUrl: user.profilepictureurl,
        theme: user.theme,
        username: user.username,
        postcount: user.postcount,
        followers: user.followers,
        following: user.following,
        location: user.location,
        bio: user.bio,
        animeInterest: user.animeInterest,
        verified: user.verified,
      })
    );
  }
  return (
    <Box bgcolor={"primary.main"} color={"primary.text"}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={{ xs: 0, sm: 2 }}
      >
        <LeftBar />
        <ComingSoon />
        <SideBar />
      </Stack>
    </Box>
  );
};

export default Setting;
