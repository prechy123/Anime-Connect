import { useSelector } from "react-redux";
import { Box, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const HomePage = () => {
  const mode = useSelector((state) => state.theme.theme);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor={"background.default"}
        color={"text.primary"}
        width="100%"
        height="100vh"
      >
        helle world
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
