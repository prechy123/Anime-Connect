import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FallbackLoading from "./components/loader/FallBackLoading";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "./pages/Profile";
//adding lazy to both login and signup to use Suspense to add a fallback
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  // let userData = useSelector((state) => state?.auth?.userData);


  return (
    <Suspense fallback={<FallbackLoading />}>
      <Router>
        <Routes>
          <Route path="/user" element={<PrivateRoutes />}>
            <Route path="home" index element={<Home />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
