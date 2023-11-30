import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    // path: "/homefeed",
    path:"/",
    element: <HomePage />
  },
]);

export default router;
