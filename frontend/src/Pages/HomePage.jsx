import { Box, Divider, Stack } from "@mui/material";
import LeftBar from "../Components/HomePage/LeftBar";
import Feed from "../Components/HomePage/Feed";
import SideBar from "../Components/HomePage/SideBar";

const HomePage = () => {
  

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
