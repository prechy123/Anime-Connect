import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FallbackLoading from "./components/loader/FallBackLoading";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  const userData = useSelector((state) => state?.auth?.userData);
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes userData={userData} />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
