import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NotFound from "./Pages/NotFound";

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/signin",
    element: <SignIn />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
