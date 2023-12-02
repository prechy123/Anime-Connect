import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NotFound from "./Pages/NotFound";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import Notifications from "./Pages/Notifications";
import Communities from "./Pages/Communities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/nofications",
    element: <Notifications />,
  },
  {
    path: "/communities",
    element: <Communities />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
