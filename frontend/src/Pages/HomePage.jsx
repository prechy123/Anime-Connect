import { useSelector } from "react-redux";
import { Box, Divider, Stack, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import LeftBar from "../Components/HomePage/LeftBar";
import Feed from "../Components/HomePage/Feed";
import SideBar from "../Components/HomePage/SideBar";

const HomePage = () => {
  const lightModeColors = {
    primary: {
      main: "#f7fafc",
      text: "#34373c",
      other: "#ffffff",
      arrow: "#ace3e3"
    },
  };
  const darkModeColors = {
    primary: {
      main: "#101418",
      text: "#ffffff",
      other: "#0f0d15",
      arrow: "#582268"
    },
  };
  const mode = useSelector((state) => state.theme.theme);
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light" ? lightModeColors : darkModeColors),
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default HomePage;
