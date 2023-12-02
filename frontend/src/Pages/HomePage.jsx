import { Box, Divider, Stack } from "@mui/material";
import LeftBar from "../Components/HomePage/LeftBar";
import Feed from "../Components/HomePage/Feed";
import SideBar from "../Components/HomePage/SideBar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isAuth } from "../redux/reducers/auth/authSlice";

const HomePage = () => {
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
        username: user.username,
        postcount: user.postcount,
        followers: user.followers,
        following: user.following
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
        <Feed />
        <SideBar />
      </Stack>
    </Box>
  );
};

export default HomePage;
