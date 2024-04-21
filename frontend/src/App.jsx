import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./redux/reducers/theme/themeSlice";

const App = () => {
  const dispatch = useDispatch();
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

  let mod;
  if (localStorage.getItem("weeebstheme")) {
    if (
      localStorage.getItem("weeebstheme") === "light" ||
      localStorage.getItem("weeebstheme") === "dark"
    ) {
      mod = localStorage.getItem("weeebstheme");
    }
  } else {
    // If no preference is set, check the user's system theme preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      mod = "dark";
    } else {
      mod = "light";
    }
    localStorage.setItem("weeebstheme", mod);
  }
  dispatch(setTheme(mod));

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
