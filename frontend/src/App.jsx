import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

const App = () => {
  const lightModeColors = {
    primary: {
      main: "#f7fafc",
      text: "#34373c",
      other: "#ffffff",
      arrow: "#ace3e3",
    },
  };
  const darkModeColors = {
    primary: {
      main: "#101418",
      text: "#ffffff",
      other: "#0f0d15",
      arrow: "#582268",
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
