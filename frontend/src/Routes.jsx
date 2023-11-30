import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";

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
  }
]);

export default router;
